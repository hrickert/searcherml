import React from 'react';
import './App.scss';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>Header</header>
      <div>
        <p>{!data ? 'Loading...' : data}</p>
      </div>
    </div>
  );
}

export default App;
