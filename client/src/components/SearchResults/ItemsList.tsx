import React from 'react';
import { observer } from 'mobx-react';
import './ItemsList.scss';
import RootStore from '../../stores/RootStore';
import Item from '../../models/Item';
import ItemsRow from './ItemsRow';

interface ItemsListProps {
  store: RootStore;
}

const ItemsList = observer((props: ItemsListProps) => {
  const { store } = props;
  const { items } = store.itemStore;

  return (
    <ol className="ItemsList">
      {items.map((item: Item, index: number) => {
        return <ItemsRow key={index} item={item} store={store} />;
      })}
    </ol>
  );
});

export default ItemsList;
