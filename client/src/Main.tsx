import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootStore from './stores/RootStore';
import { observer } from 'mobx-react';
import './Main.scss';
import Header from './components/Search/Header';
import Items from './components/SearchResults/Items';
import Item from './components/ProductDetail/Item';

interface MainProps {
  store: RootStore;
}

const Main = observer((props: MainProps) => {
  const { store } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header store={store} />}>
          <Route
            path="items"
            element={
              <main>
                <Items store={store} />
              </main>
            }
          />
          <Route
            path="items/:id"
            element={
              <main>
                <Item store={store} />
              </main>
            }
          />
          <Route
            path="*"
            element={
              <main>
                <p>Nada para mostrar</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default Main;
