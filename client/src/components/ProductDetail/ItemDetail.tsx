import React from 'react';
import './ItemDetail.scss';
import { observer } from 'mobx-react';
import Item from '../../models/Item';
import RootStore from '../../stores/RootStore';

interface ItemDetailProps {
  store: RootStore;
  item: Item;
}

const ItemDetail = observer((props: ItemDetailProps) => {
  const { title, price, picture, infoStr, description } = props.item;
  const { windowWidth } = props.store;
  let smallScreen = windowWidth < 1050;
  let imgPx = smallScreen ? 320 : 680;

  return (
    <div className="ItemDetail">
      <div className="ItemDetailLeft">
        <div className="ItemDetailImage">
          <img style={{ objectFit: 'contain' }} width={imgPx} src={picture} alt={title} />
          {smallScreen && <button className="ItemDetailButton">Comprar</button>}
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
        {!smallScreen && <button className="ItemDetailButton">Comprar</button>}
      </div>
    </div>
  );
});

export default ItemDetail;
