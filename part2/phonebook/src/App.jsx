import { useState } from 'react'

const PersonList = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>{person.name} {person.number}</li>
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

const Persons = ({ filter, persons }) => {
  return (
    filter === ""
      ? <PersonList persons={persons} />
      : <PersonList persons={persons.filter(e => e.name.includes(filter))} />
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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
      id: persons.length + 1,
    }

    if (persons.filter(e => e.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
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
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App