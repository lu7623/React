import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <img src="pokemons.png" alt="pokemons" />
        <h1>404 Page Not Found</h1>
        <button onClick={() => navigate('..')}>Go back</button>
      </div>
    </>
  );
}
