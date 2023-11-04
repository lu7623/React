import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Pagination() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pageId } = useParams();
  const nextPage = pageId ? Number(pageId) + 1 : null;
  const prevPage = pageId ? Number(pageId) - 1 : null;
  const qty = searchParams.get('qty');
  const [value, setValue] = useState(qty ? qty : '20');

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    searchParams.set('qty', value);
    setSearchParams(searchParams);
    navigate(`/page/1?qty=${value}`);
  }, [value]);

  return (
    <div className="pagination">
      <div className="navigation">
        <button
          disabled={!prevPage}
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
        />
        <label htmlFor="10">10</label>
        <input
          type="radio"
          name="radio"
          value="20"
          id="20"
          checked={value == '20' ? true : false}
          onChange={changeValue}
        />
        <label htmlFor="20">20</label>
        <input
          type="radio"
          name="radio"
          value="40"
          id="40"
          checked={value == '40' ? true : false}
          onChange={changeValue}
        />
        <label htmlFor="40">40</label>
      </div>
    </div>
  );
}
