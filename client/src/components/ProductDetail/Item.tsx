import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Item.scss';
import RootStore from '../../stores/RootStore';
import ItemCategories from '../SearchResults/ItemCategories';
import ItemDetail from './ItemDetail';
import Spinner from '../Spinner';

interface ItemProps {
  store: RootStore;
}

const Item = observer((props: ItemProps) => {
  const [gettingData, setGettingData] = useState(false);
  const { store } = props;
  const { itemStore } = store;
  const { currentItem } = itemStore;
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
          <Spinner />
        ) : (
          <>
            <ItemCategories store={store} />
            {currentItem && (
              <>
                <ItemDetail item={currentItem} />{' '}
                <Helmet>
                  <title>{`${currentItem.title} | MercadoLibre 📦`}</title>
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
