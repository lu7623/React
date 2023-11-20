import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Pokemon } from '../../api/types';
import { useAppDispatch, useAppSelector } from '../../hooks/custom';
import { perPageSlice } from '../../store/reducers/perPageSlice';

export default function Pagination({ pokemons }: { pokemons: Pokemon[] }) {
  const { qty } = useAppSelector((state) => state.perPageReducer);
  const { searchStr } = useAppSelector((state) => state.searchReducer);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { newLimit } = perPageSlice.actions;
  const pageId = router.query.pageId;
  const [value, setValue] = useState(qty);
  const maxPage = Math.ceil(1200 / Number(value));
  const nextPage =
    Number(pageId) < maxPage && pokemons.length !== 1
      ? Number(pageId) + 1
      : null;
  const prevPage = pageId ? Number(pageId) - 1 : 0;

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    dispatch(newLimit(event.target.value));
  }

  useEffect(() => {
    searchStr === '' && router.push(`/page/1`);
  }, [value]);

  return (
    <>
      <div className="pagination">
        <div className="navigation">
          <button
            disabled={prevPage === 0 || pokemons.length === 1}
            className="navBtn"
            onClick={() => router.push(`/page/${prevPage}`)}
          >
            prev
          </button>
          <h3> Page # {pageId}</h3>
          <button
            disabled={!nextPage}
            className="navBtn"
            onClick={() => router.push(`/page/${nextPage}`)}
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
