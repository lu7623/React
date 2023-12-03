import { useRef } from 'react';

export default function Uncontrolled() {
  const nameInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    alert(`Name: ${nameInputRef.current ? nameInputRef.current.value : ''}`);
  }

  return (
    <div className="App">
      <h3>Uncontrolled Component</h3>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input type="text" name="name" ref={nameInputRef} />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="age">Age:</label>
        <input type="text" name="age" id="age" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="confirm">Confirm password:</label>
        <input type="password" id="confirm" name="confirm" />
        <label htmlFor="gender">Gender Selection</label>
        <select id="gender">
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <input type="checkbox" id="acceptTerms" name="acceptTerms" />
        <label htmlFor="acceptTerms">Accept terms and conditions</label>
        <label htmlFor="picture">Choose image to upload (PNG, JPG)</label>
        <input
          type="file"
          id="picture"
          accept="image/png, image/jpeg, image/jpg"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
