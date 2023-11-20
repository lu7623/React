import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div>
        <img src="pokemons.png" alt="pokemons" />
        <h1>404 Page Not Found</h1>
        <button onClick={() => router.back()}>Go back</button>
      </div>
    </>
  );
}
