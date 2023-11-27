import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/page/1?qty=20');
  }, []);

  return <div></div>;
}
