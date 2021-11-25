import { observable } from 'mobx';
import * as _ from 'lodash';

import RootStore from './RootStore';
import Item from '../models/Item';

export default class ItemStore {
  rootStore: RootStore;
  @observable items: Array<Item> = [];
  @observable visible: boolean = true;
  @observable selectedTour?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}
