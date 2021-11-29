import React, { useEffect, useState } from 'react';
import './Item.scss';
import RootStore from '../../stores/RootStore';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import ItemCategories from '../SearchResults/ItemCategories';
import ItemDetail from './ItemDetail';

interface ItemProps {
  store: RootStore;
}

const Item = observer((props: ItemProps) => {
  const [gettingData, setGettingData] = useState(false);
  const { itemStore } = props.store;
  const { categories, item } = itemStore;
  let itemId = useParams().id;

  useEffect(() => {
    setGettingData(true);

    itemStore
      .fetchItem(itemId || '0')
      .then(() => setGettingData(false))
      .catch(() => setGettingData(false)); // FIXME mostrar error
  }, [itemStore, itemId]);

  return (
    <div className="Item">
      <div className="ItemWrapper">
        {gettingData ? (
          'Cargando'
        ) : (
          <>
            <ItemCategories categories={categories} />
            {item && <ItemDetail item={item} />}
          </>
        )}
      </div>
    </div>
  );
});

export default Item;
