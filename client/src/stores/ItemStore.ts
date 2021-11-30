import { action, observable } from 'mobx';
import RootStore from './RootStore';
import Item from '../models/Item';
import * as _ from 'lodash';

export default class ItemStore {
  rootStore: RootStore;
  @observable author?: string;
  @observable categoriesItemsSearch?: Array<string>;
  @observable items: Array<Item> = [];
  @observable currentItem?: Item;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  fetchItems(query?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`/api/items${query}`)
        .then((res) => res.json())
        .then((data) => {
          let items = _.slice(data.items || [], 0, 4);
          this.items = _.map(items, (itemData: object) => new Item(itemData));
          this.categoriesItemsSearch = data.categories;
          resolve();
        })
        .catch((error: string) => reject(error));
    });
  }

  @action
  fetchItem(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`/api/items/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.currentItem = new Item(data.item);
          resolve();
        })
        .catch((error: string) => reject(error));
    });
  }
}
