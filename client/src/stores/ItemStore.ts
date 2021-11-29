import { action, observable } from 'mobx';

import RootStore from './RootStore';
import Item from '../models/Item';
import * as _ from 'lodash';

export default class ItemStore {
  rootStore: RootStore;
  // FIXME author ?
  @observable categories?: Array<string>;
  @observable items: Array<Item> = [];
  @observable item?: Item;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  fetchItems(query?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`/api/items${query}`)
        .then((res) => res.json())
        .then((data) => {
          this.items = _.map(data.items, (itemData: object) => new Item(itemData));
          this.categories = data.categories;
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
          this.item = new Item(data.item);
          resolve();
        })
        .catch((error: string) => reject(error));
    });
  }
}
