import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { pokemonAPI } from '../services/pokemonService';
import PokemonsList from '../components/PokemonsList';
import Loading from '../components/Loading';

export function PokemonPage() {
  const navigate = useNavigate();
  const { pageId } = useParams();

  const [page, setPage] = useState(pageId ? Number(pageId) : 1);
  const [value, setValue] = useState('20');

  const { data, isLoading } = pokemonAPI.useGetPokemonsByPageQuery({
    pageNum: page,
    qty: Number(value),
  });
  const pokemonNames = data ? data.map((p) => p.name) : [];

  const maxPage = Math.ceil(1200 / Number(value));
  const nextPage =
    Number(pageId) < maxPage && pokemonNames?.length !== 1
      ? Number(pageId) + 1
      : 1;
  const prevPage = pageId ? Number(pageId) - 1 : 0;

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setPage(1);
  }

  useEffect(() => {
    navigate(`/page/1?qty=${value}`);
  }, [value, navigate]);

  return (
    <>
      <div className="pagination">
        <div className="navigation">
          <button
            disabled={prevPage === 0 || pokemonNames?.length === 1}
            className="navBtn"
            onClick={() => {
              setPage(prevPage);
              navigate(`/page/${prevPage}?qty=${value}`);
            }}
          >
            prev
          </button>
          <h3> Page # {pageId}</h3>
          <button
            disabled={!nextPage}
            className="navBtn"
            onClick={() => {
              setPage(nextPage);
              navigate(`/page/${nextPage}?qty=${value}`);
            }}
          >
            next
          </button>
        </div>
        <div className="pageCheck">
          <h4>Cards per page</h4>
          <input
            type="radio"
            name="radio"
            value="10"
            id="10"
            checked={value == '10' ? true : false}
            onChange={changeValue}
            disabled={pokemonNames && pokemonNames.length <= 1}
          />
          <label htmlFor="10">10</label>
          <input
            type="radio"
            name="radio"
            value="20"
            id="20"
            checked={value == '20' ? true : false}
            onChange={changeValue}
            disabled={pokemonNames && pokemonNames.length <= 1}
          />
          <label htmlFor="20">20</label>
          <input
            type="radio"
            name="radio"
            value="40"
            id="40"
            checked={value == '40' ? true : false}
            onChange={changeValue}
            disabled={pokemonNames && pokemonNames.length <= 1}
          />
          <label htmlFor="40">40</label>
        </div>
      </div>
      {isLoading ? <Loading /> : <PokemonsList pokemonNames={pokemonNames} />}
    </>
  );
}
