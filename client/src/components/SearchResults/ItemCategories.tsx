import React from 'react';
import { observer } from 'mobx-react';
import './ItemCategories.scss';
import RootStore from '../../stores/RootStore';

interface ItemCategoriesProps {
  store: RootStore;
}

const ItemCategories = observer((props: ItemCategoriesProps) => {
  const { categoriesItemsSearch } = props.store.itemStore;
  let list = categoriesItemsSearch || [];

  return (
    <ol className="ItemCategories">
      {list.map((category: string, index: number) => {
        let last = index === list.length - 1;
        return <li key={index}>{`${category} ${last ? '' : '>'}`}</li>;
      })}
    </ol>
  );
});

export default ItemCategories;
