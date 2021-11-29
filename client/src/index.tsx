import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import RootStore from './stores/RootStore';
import Main from './Main';

const rootStore = new RootStore();
(window as any).rootStore = rootStore;

ReactDOM.render(
  <React.StrictMode>
    <Main store={rootStore} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
