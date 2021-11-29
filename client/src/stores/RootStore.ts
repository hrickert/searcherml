import ItemStore from './ItemStore';

class RootStore {
  itemStore: ItemStore;

  constructor() {
    this.itemStore = new ItemStore(this);
  }
}

export default RootStore;
