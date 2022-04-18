import React, {useState, useEffect} from 'react';

function App() {
  const [str, writeStr] = useState('');
  useEffect(() => {
   fetch(' http://localhost:3000/app/hello').then(res => {
       return res.text()
   }).then(res => writeStr(res));
  }, []);
  return (
    <div className="App">
        <h1>{str}</h1>
    </div>
  );
}

export default App;
