import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const PokemonDetailPage = () => {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!pokemon) {
    return <span className="loading loading-bars loading-lg text-center "></span>;
  }

  const { name, sprites, height, weight, types } = pokemon;

  return (
   <div>
    <div className="ml-3 text-lg breadcrumbs">
  <ul>
    <li><Link to={"/"}>Home</Link></li> 
    <li><a>{name}</a></li> 
    
  </ul>
</div>
    <div className="card w-96 bg-gray-800 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={sprites.front_default} alt={name} className=" h-60" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{name}</h2>
    <p><strong>Height:</strong> {height}</p>
      <p><strong>Weight:</strong> {weight}</p>
      <p><strong>Types:</strong> {types.map(type => type.type.name).join(', ')}</p>
    <div className="card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
</div>
  );
};

export default PokemonDetailPage;
