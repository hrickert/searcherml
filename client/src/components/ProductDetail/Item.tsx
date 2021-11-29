import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Item.scss';
import RootStore from '../../stores/RootStore';
import ItemCategories from '../SearchResults/ItemCategories';
import ItemDetail from './ItemDetail';

interface ItemProps {
  store: RootStore;
}

const Item = observer((props: ItemProps) => {
  const [gettingData, setGettingData] = useState(false);
  const { store } = props;
  const { itemStore } = store;
  const { item } = itemStore;
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
          <>
            Cargando
            <Helmet>
              <title>Cargando...</title>
            </Helmet>
          </>
        ) : (
          <>
            <ItemCategories store={store} />
            {item && (
              <>
                <ItemDetail item={item} />{' '}
                <Helmet>
                  <title>{`${item.title} | MercadoLibre 📦`}</title>
                </Helmet>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default Item;
