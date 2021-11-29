import React, { useEffect, useState } from 'react';
import './Items.scss';
import RootStore from '../../stores/RootStore';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import ItemsList from './ItemsList';
import ItemCategories from './ItemCategories';

interface ItemsProps {
  store: RootStore;
}

const Items = observer((props: ItemsProps) => {
  const { store } = props;
  const { itemStore } = store;
  const { categories } = itemStore;
  const [gettingData, setGettingData] = useState(false);
  let query = useLocation().search.replace('search', 'q');

  useEffect(() => {
    setGettingData(true);

    itemStore
      .fetchItems(query)
      .then(() => setGettingData(false))
      .catch(() => setGettingData(false)); // FIXME mostrar error
  }, [itemStore, query]);

  return (
    <div className="Items">
      <div className="ItemsWrapper">
        {gettingData ? (
          'Cargando'
        ) : (
          <>
            <ItemCategories categories={categories} />
            <ItemsList store={store} />
          </>
        )}
      </div>
    </div>
  );
});

export default Items;
