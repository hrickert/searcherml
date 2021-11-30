import RootStore from './RootStore';
import ItemStore from './ItemStore';
import Item from '../models/Item';
import fetch from 'jest-fetch-mock';

let rootStore: RootStore;
const itemsResponse = {
  author: {},
  categories: ['Autos, Motos y Otros', 'Motos'],
  items: [
    {
      id: 'MLA925840874',
      title: 'Yamaha Fz S Fi D Disco Trasero 18 Cuotas  Consultar Contado',
      price: {
        currency: 'ARS',
        amount: 424700,
      },
      picture: 'http://http2.mlstatic.com/D_830081-MLA46597224178_072021-I.jpg',
      condition: 'new',
      free_shipping: false,
      address_state_name: 'Capital Federal',
    },
    {
      id: 'MLA925840881',
      title: 'Yamaha Fz 25 Fz25 18 Cuotas Sin Interes !!! Ciclofoxmotos',
      price: {
        currency: 'ARS',
        amount: 683000,
      },
      picture: 'http://http2.mlstatic.com/D_948176-MLA47356986478_092021-I.jpg',
      condition: 'new',
      free_shipping: false,
      address_state_name: 'Capital Federal',
    },
    {
      id: 'MLA1113738098',
      title: 'Motomel Blitz 110 Automatica Base 0km Scooter',
      price: {
        currency: 'ARS',
        amount: 119990,
      },
      picture: 'http://http2.mlstatic.com/D_727073-MLA42676531087_072020-I.jpg',
      condition: 'new',
      free_shipping: false,
      address_state_name: 'Capital Federal',
    },
    {
      id: 'MLA923088052',
      title: 'Zanella Exclusive 150 - Ahora 12/18 - Créditos Dni!',
      price: {
        currency: 'ARS',
        amount: 278900,
      },
      picture: 'http://http2.mlstatic.com/D_699171-MLA46212608323_052021-I.jpg',
      condition: 'new',
      free_shipping: false,
      address_state_name: 'Capital Federal',
    },
    {
      id: 'MLA923097183',
      title: 'Zanella Zr 200 Ohc - Ahora 12/18 - Créditos Dni!',
      price: {
        currency: 'ARS',
        amount: 291900,
      },
      picture: 'http://http2.mlstatic.com/D_682026-MLA46213205466_052021-I.jpg',
      condition: 'new',
      free_shipping: false,
      address_state_name: 'Capital Federal',
    },
    {
      id: 'MLA1110845175',
      title: 'Motomel Skua 250 - Ahora 12/18  Crédito Dni!',
      price: {
        currency: 'ARS',
        amount: 289900,
      },
      picture: 'http://http2.mlstatic.com/D_699761-MLA48101147968_112021-I.jpg',
      condition: 'new',
      free_shipping: false,
      address_state_name: 'Capital Federal',
    },
    {
      id: 'MLA925839770',
      title: 'Yamaha R3 Yzf Nueva 0km Ciclofox Acepto Permuta',
      price: {
        currency: 'USD',
        amount: 9800,
      },
      picture: 'http://http2.mlstatic.com/D_608706-MLA48169506311_112021-I.jpg',
      condition: 'new',
      free_shipping: false,
      address_state_name: 'Capital Federal',
    },
  ],
};

const itemResponse = {
  author: {},
  categories: [],
  item: {
    id: 'MLA828175127',
    title: 'Pistola De Agua Con Tanque Mochila Abeja Pinguino Vaquita',
    price: {
      currency: 'ARS',
      amount: 1640,
    },
    picture: 'http://http2.mlstatic.com/D_626266-MLA48372419758_112021-O.jpg',
    condition: 'new',
    free_shipping: false,
    sold_quantity: 1795,
    description:
      '\nEspectacular pistola lanzadora de agua con mochila para divertirse, con capacidad de almacenamiento de agua',
  },
};

beforeEach(() => {
  fetch.resetMocks();
  rootStore = new RootStore();
});

describe('fetch items', () => {
  const apiUrl = '/api/items';
  const query = '?q=some%20query';

  it('save correct data', async () => {
    fetch.mockResponseOnce(JSON.stringify(itemsResponse));
    const itemStore = new ItemStore(rootStore);
    await itemStore.fetchItems(query);

    const { items, categoriesItemsSearch } = itemStore;
    // La API devuelve 7 items pero se guardan 4 en el store
    expect(items.length).toEqual(4);
    expect(categoriesItemsSearch.length).toEqual(2);
  });

  it('correct request', async () => {
    fetch.mockResponseOnce(JSON.stringify(itemsResponse));
    const itemStore = new ItemStore(rootStore);
    await itemStore.fetchItems(query);

    // Se realiza una sola llamada al endpoint correcto
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${apiUrl}${query}`);
  });
});

describe('fetch item', () => {
  const apiUrl = '/api/item';
  const id = 'MLA828175127';

  it('save correct data', async () => {
    fetch.mockResponseOnce(JSON.stringify(itemResponse));
    const itemStore = new ItemStore(rootStore);
    await itemStore.fetchItem(id);

    const { currentItem } = itemStore;
    // La API devuelve 7 items pero se guardan 4 en el store
    expect(currentItem.id).toEqual('MLA828175127');
    expect(currentItem.title).toEqual('Pistola De Agua Con Tanque Mochila Abeja Pinguino Vaquita');
    expect(currentItem.price.amount).toEqual(1640);
    expect(currentItem.price.currency).toEqual('ARS');
    expect(currentItem.price.decimals).toEqual(0);
    expect(currentItem.price.priceStr).toEqual('ARS 1640');
    expect(currentItem.picture).toEqual(
      'http://http2.mlstatic.com/D_626266-MLA48372419758_112021-O.jpg'
    );
    expect(currentItem.condition).toEqual('new');
    expect(currentItem.freeShipping).toEqual(false);
    expect(currentItem.soldQuantity).toEqual(1795);
    expect(currentItem.description).toEqual(
      '\nEspectacular pistola lanzadora de agua con mochila para divertirse, con capacidad de almacenamiento de agua'
    );
    expect(currentItem.infoStr).toEqual('Nuevo - 1795 vendidos');
  });
});
