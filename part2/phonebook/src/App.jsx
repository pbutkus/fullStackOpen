import { useState, useEffect } from 'react';
import personService from './services/personService';

const PersonList = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li>
      ))}
    </ul>
  );
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {


  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>filter shown with: <input value={filter} onChange={handleFilterChange} /></div>
  );
}

const Persons = ({ filter, persons, deletePerson }) => {
  return (
    filter === ""
      ? <PersonList persons={persons} deletePerson={deletePerson} />
      : <PersonList persons={persons.filter(e => e.name.includes(filter))} deletePerson={deletePerson} />
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const fetchPersons = async () => {
    setPersons(await personService.getAll());
  }

  const createPerson = async (newPerson) => {
    setPersons(persons.concat(await personService.create(newPerson)));
    setNewName("");
    setNewNumber("");
  }

  const deletePerson = async (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      await personService.remove(person.id);

      fetchPersons();
    }
  }

  const updatePerson = async (id, person) => {
    await personService.update(id, person);

    setNewName("");
    setNewNumber("");

    fetchPersons();
  }

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const filteredPersons = persons.filter(e => e.name === newName);

    if (filteredPersons.length > 0) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(filteredPersons[0].id, personObject);
      }
    } else {
      createPerson(personObject);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App