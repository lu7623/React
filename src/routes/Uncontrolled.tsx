import React, { useRef } from 'react';

export default function Uncontrolled() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    alert(`Name: ${inputRef.current ? inputRef.current.value : ''}`);
  }

  return (
    <div className="App">
      <h1 className="geeks">GeeksForGeeks</h1>
      <h3>Uncontrolled Component</h3>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input type="text" name="name" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
