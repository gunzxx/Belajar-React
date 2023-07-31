/* eslint-disable react/prop-types */
import { useState } from 'react';
import Header from './Header';

function App() {
  const [like, setLike] = useState(0);

  return (
    <>
      <Header />
      <button onClick={() => setLike(like + 1)}>Like ({like})</button>
    </>
  );
}

export default App;
