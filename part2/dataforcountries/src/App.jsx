import { useEffect, useState } from 'react';
import countryService from './services/countryService';
import weatherService from './services/weatherService';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <span>find countries: </span>
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}

const CountryData = ({ country, weather }) => {
  return (
    <div>
      {
        country && (
          <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
              {
                Object.values(country.languages).map((language) => <li key={language}>{language}</li>)
              }
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <Weather city={country.capital} weather={weather} />
          </div >
        )
      }
    </div>
  )
}

const Weather = ({ city, weather }) => {
  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        {
          weather ? <span>{`temperature ${weather.main.temp} Celcius`}</span> : <span>Loading weather data...</span>
        }
      </div>
      <div>
        {
          weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        }
      </div>
      <div>
        {
          weather && <span>wind {weather.wind.speed} m/s</span>
        }
      </div>
    </div>
  )
}

const CountryList = ({ filteredCountries, handleCountrySelect }) => {
  return (
    <ul>
      {filteredCountries.length <= 10 && filteredCountries.map(country => (
        <li key={country.name.common}>{country.name.common} <button onClick={() => handleCountrySelect(country)}>show</button></li>
      ))}
      {filteredCountries.length > 10 && <span>Too many matches, specify another filter</span>}
    </ul>
  );
}

function App() {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchCountryData = async () => {
    setCountries(await countryService.getAll());
  }

  const fetchWeatherData = async (city) => {
    setWeather(await weatherService.getByCity(city));
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    setFilteredCountries(countries.filter((country) =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    ));
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  }

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    if (countries) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      );

      if (filtered.length === 1) {
        setSelectedCountry(filtered[0]);
        // fetchWeatherData(filtered[0].capital);
      } else {
        setSelectedCountry(null);
      }

      setFilteredCountries(filtered);
    }
  }, [filter]);

  useEffect(() => {
    if (selectedCountry) {
      fetchWeatherData(selectedCountry.capital);
      console.log(weather);
    }
  }, [selectedCountry])

  if (countries === null) {
    return null;
  }

  return (
    <>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        {filteredCountries.length === 1 ? (
          <CountryData country={selectedCountry} weather={weather} />
        ) : (
          <div>
            <CountryList filteredCountries={filteredCountries} handleCountrySelect={handleCountrySelect} />
            {selectedCountry && <CountryData country={selectedCountry} weather={weather} />}
          </div>
        )}
      </div>
    </>
  )
}

export default App
