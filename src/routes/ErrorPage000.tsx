import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  let message = '';
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "This page doesn't exist!";
    }

    if (error.status === 503) {
      message = 'Looks like our API is down';
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  } else message = 'Something went wrong';
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <h3>
        <i>{message}</i>
      </h3>
      <Link to={'/'}>Go back</Link>
    </div>
  );
}
