import React from 'react';
import { observer } from 'mobx-react';
import './ItemsRow.scss';
import Item from '../../models/Item';
import shipping from '../../img/ic_shipping.png';
import { useNavigate } from 'react-router-dom';
import RootStore from '../../stores/RootStore';

interface ItemsRowProps {
  store: RootStore;
  item: Item;
}

const ItemsRow = observer((props: ItemsRowProps) => {
  let navigate = useNavigate();
  const { id, title, price, picture, freeShipping, addressStateName } = props.item;
  const { isMobile } = props.store;
  let imgPx = isMobile ? 120 : 180;

  return (
    <li className="ItemsRow">
      <div className="ItemsRowWrapper" onClick={() => navigate(`${id}`)}>
        <div className="ItemsRowImage">
          <img
            style={{ objectFit: 'contain' }}
            width={imgPx}
            height={imgPx}
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
      </div>
    </li>
  );
});

export default ItemsRow;
