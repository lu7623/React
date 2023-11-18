import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { pokemonsContext } from '../Root0000';

export default function Pagination() {
  const pokemons = useContext(pokemonsContext);
  const navigate = useNavigate();
  const { pageId } = useParams();
  const [value, setValue] = useState('20');
  const maxPage = Math.ceil(1200 / Number(value));
  const nextPage =
    Number(pageId) < maxPage && pokemons.length !== 1
      ? Number(pageId) + 1
      : null;
  const prevPage = pageId ? Number(pageId) - 1 : 0;

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    navigate(`/page/1?qty=${value}`);
  }, [value, navigate]);

  return (
    <>
      <div className="pagination">
        <div className="navigation">
          <button
            disabled={prevPage === 0 || pokemons.length === 1}
            className="navBtn"
            onClick={() => navigate(`/page/${prevPage}?qty=${value}`)}
          >
            prev
          </button>
          <h3> Page # {pageId}</h3>
          <button
            disabled={!nextPage}
            className="navBtn"
            onClick={() => navigate(`/page/${nextPage}?qty=${value}`)}
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
            disabled={pokemons.length <= 1}
          />
          <label htmlFor="10">10</label>
          <input
            type="radio"
            name="radio"
            value="20"
            id="20"
            checked={value == '20' ? true : false}
            onChange={changeValue}
            disabled={pokemons.length <= 1}
          />
          <label htmlFor="20">20</label>
          <input
            type="radio"
            name="radio"
            value="40"
            id="40"
            checked={value == '40' ? true : false}
            onChange={changeValue}
            disabled={pokemons.length <= 1}
          />
          <label htmlFor="40">40</label>
        </div>
      </div>
    </>
  );
}
