import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next/types';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  let message: string;
  const router = useRouter();
  if (statusCode === 503) {
    message = 'Looks like our API is down';
  } else message = 'Something went wrong';
  return (
    <>
      <p>{message}</p>
      <button onClick={() => router.push('/')}>Go back</button>
    </>
  );
};

({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
