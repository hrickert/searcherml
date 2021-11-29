import React from 'react';
import { observer } from 'mobx-react';
import './ItemsRow.scss';
import Item from '../../models/Item';
import shipping from '../../img/ic_shipping.png';

interface ItemsRowProps {
  item: Item;
}

const ItemsRow = observer((props: ItemsRowProps) => {
  const { id, title, price, picture, freeShipping, addressStateName } = props.item;
  return (
    <li className="ItemsRow">
      <a className="ItemsRowWrapper" href={`items/${id}`}>
        <div className="ItemsRowImage">
          <img
            style={{ objectFit: 'contain' }}
            width={180}
            height={180}
            src={picture}
            alt={title}
          />
        </div>
        <div className="ItemsRowGeneralData">
          <div className="ItemsRowGeneralDataPrice">
            {price.priceStr}
            {freeShipping && (
              <img style={{ objectFit: 'contain' }} src={shipping} alt={'Envío gratis'} />
            )}
          </div>
          <div className="ItemsRowGeneralDataTitle">{title}</div>
        </div>
        <div className="ItemsRowLocation">{addressStateName}</div>
      </a>
    </li>
  );
});

export default ItemsRow;
