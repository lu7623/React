import { Pokemon } from '../api/types';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loading from './components/Loading';
import { getDetails, getPokemon } from '../api/getPokemons';
import { useEffect, useState } from 'react';

export default function PokemonDetails() {
  const [details, setDetails] = useState('');

  const [load, setLoad] = useState(false);
  const { pageId, detailsId } = useParams();
  const { search } = useLocation();
  const [pokemon, setPokemon] = useState<Pokemon>();
  useEffect(() => {
    async function fetchData(pokemonId: string) {
      setLoad(true);
      const newPokemon = await getPokemon(pokemonId);
      setPokemon(newPokemon);
      const data = await getDetails(newPokemon);
      setDetails(data);
      setLoad(false);
    }

    if (detailsId) {
      fetchData(detailsId);
    }
  }, [detailsId]);

  const url = pageId ? `/page/${pageId}${search}` : '..';
  return (
    <>
      <div
        data-testid="details"
        className="details"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close">
          <Link className="closeBtn" to={url} data-testid="close"></Link>
        </div>

        {load ? (
          <Loading />
        ) : (
          pokemon && (
            <>
              <h2>{pokemon.name.toUpperCase()}</h2>
              <h3>
                Type:
                {pokemon.types.map((type) => (
                  <span className="type" key={type.type.name}>
                    {type.type.name}
                  </span>
                ))}
              </h3>
              <h4 className="size">Height: {pokemon.height / 10} m</h4>
              <h4 className="size">Weight: {pokemon.weight / 10} kg</h4>
              <div style={{ display: 'flex' }}>
                <img
                  src={
                    pokemon.sprites.front_default
                      ? pokemon.sprites.front_default
                      : '/notAvaliable.jpg'
                  }
                  alt="pokemon-front"
                  width={200}
                />
                <img
                  src={
                    pokemon.sprites.back_default
                      ? pokemon.sprites.back_default
                      : '/notAvaliable.jpg'
                  }
                  alt="pokemon-back"
                  width={200}
                />
              </div>
              <p>{details ? details : ''}</p>
              <h3>Stats:</h3>
              <div className="stat">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    {stat.stat.name} - {stat.base_stat}
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}
