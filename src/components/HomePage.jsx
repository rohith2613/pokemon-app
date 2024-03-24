import  { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PokemonDetailPage from './PokemonDetailPage';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        setPokemonList(response.data.results);
        setFilteredPokemonList(response.data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterPokemonList(event.target.value, filterType);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    filterPokemonList(searchTerm, event.target.value);
  };

  const filterPokemonList = async (searchTerm, filterType) => {
    try {
      let filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (filterType) {
        const filteredPokemonPromises = filteredList.map(pokemon => {
          return axios.get(pokemon.url)
            .then(response => response.data.types.some(type => type.type.name === filterType))
            .catch(error => {
              console.error(error);
              return false; // Return false for failed requests
            });
        });
        const filteredPokemonResults = await Promise.all(filteredPokemonPromises);
        filteredList = filteredList.filter((pokemon, index) => filteredPokemonResults[index]);
      }
      setFilteredPokemonList(filteredList);
      setError(null); // Reset error state
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex flex-row mb-4">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 mr-2 w-1/2 border rounded"
          />
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="px-4 py-2 w-1/2 border rounded"
          >
            <option value="">All Types</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            {/* Add other types here */}
          </select>
        </div>
        <Routes>
          <Route exact path="/" element={<PokemonList pokemonList={filteredPokemonList} />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const PokemonList = ({ pokemonList }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemonList.map(pokemon => (
          <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`} className="bg-gray-200 p-4 rounded cursor-pointer">
            <p className="text-lg font-bold capitalize text-primary">{pokemon.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
