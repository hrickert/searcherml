import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Items.scss';
import RootStore from '../../stores/RootStore';
import ItemsList from './ItemsList';
import ItemCategories from './ItemCategories';
import * as _ from 'lodash';

interface ItemsProps {
  store: RootStore;
}

const Items = observer((props: ItemsProps) => {
  const { store } = props;
  const { itemStore } = store;
  const [gettingData, setGettingData] = useState(false);
  let query = useLocation().search.replace('search', 'q');
  let [params] = useSearchParams();
  let list = params.getAll('search');

  useEffect(() => {
    setGettingData(true);

    itemStore
      .fetchItems(query)
      .then(() => setGettingData(false))
      .catch(() => setGettingData(false)); // FIXME mostrar error
  }, [itemStore, query]);

  return (
    <div className="Items">
      <div className="ItemsWrapper">
        {gettingData ? (
          <>
            Cargando
            <Helmet>
              <title>Cargando...</title>
            </Helmet>
          </>
        ) : (
          <>
            <Helmet>
              <title>{`${_.join(list, ' ')} | MercadoLibre 📦`}</title>
            </Helmet>
            <ItemCategories store={store} />
            <ItemsList store={store} />
          </>
        )}
      </div>
    </div>
  );
});

export default Items;
