import Image from 'next/image';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Image alt="pokemons" src={'/pokemons.png'} width={500} height={200} />
        <h1>404 Page Not Found</h1>
        <button style={{ width: '100px' }} onClick={() => router.back()}>
          Go back
        </button>
      </div>
    </>
  );
}
