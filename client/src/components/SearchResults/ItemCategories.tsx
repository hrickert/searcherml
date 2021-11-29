import React from 'react';
import './ItemCategories.scss';
import { observer } from 'mobx-react';

interface ItemCategoriesProps {
  categories?: Array<string>;
}

const ItemCategories = observer((props: ItemCategoriesProps) => {
  const { categories } = props;
  let list = categories ? categories : [];

  return (
    <ol className="ItemCategories">
      {list.map((category: string, index: number) => {
        let last = index === list.length - 1;
        return <li>{`${category} ${last ? '' : '>'}`}</li>;
      })}
    </ol>
  );
});

export default ItemCategories;
