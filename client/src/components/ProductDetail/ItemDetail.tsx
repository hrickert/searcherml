import React from 'react';
import './ItemDetail.scss';
import { observer } from 'mobx-react';
import Item from '../../models/Item';

interface ItemDetailProps {
  item: Item;
}

const ItemDetail = observer((props: ItemDetailProps) => {
  const { title, price, picture, infoStr, description } = props.item;

  return (
    <div className="ItemDetail">
      <div className="ItemDetailLeft">
        <div className="ItemDetailImage">
          <img style={{ objectFit: 'contain' }} width={680} src={picture} alt={title} />
          <div className="ItemDetailDescription">
            <div className="ItemDetailDescriptionTitle">Descripción del producto</div>
            <p className="ItemDetailDescriptionText">{description}</p>
          </div>
        </div>
      </div>
      <div className="ItemDetailRight">
        <div className="ItemDetailInfo">{infoStr}</div>
        <div className="ItemDetailTitle">{title}</div>
        <div className="ItemDetailPrice">{price.priceStr}</div>
        <button className="ItemDetailButton">Comprar</button>
      </div>
    </div>
  );
});

export default ItemDetail;
