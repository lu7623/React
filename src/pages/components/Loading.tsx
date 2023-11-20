export default function Loading() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 'calc(50% - 100px)',
          top: '300px',
        }}
      >
        <img src="/spinner.gif" alt="loading" style={{ opacity: '100%' }} />
      </div>
    </>
  );
}
