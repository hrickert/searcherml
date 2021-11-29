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
  const { itemStore } = props.store;
  const { items } = itemStore;

  return (
    <ol className="ItemsList">
      {items.map((item: Item, index: number) => {
        return <ItemsRow key={index} item={item} />;
      })}
    </ol>
  );
});

export default ItemsList;
