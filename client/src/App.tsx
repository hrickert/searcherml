import React from 'react';
import './App.scss';
import RootStore from './stores/RootStore';
import { observer } from 'mobx-react';

interface AppProps {
  store: RootStore;
}

const App = observer((props: AppProps) => {
  // const { store } = props;
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className='App'>
      <div>
        <p>{!data ? 'Loading...' : data}</p>
      </div>
      <div></div>
    </div>
  );
});

export default App;
