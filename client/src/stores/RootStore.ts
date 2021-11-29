import ItemStore from './ItemStore';
import UiStore from './UiStore';

class RootStore {
  uiStore: UiStore;
  itemStore: ItemStore;

  constructor() {
    this.uiStore = new UiStore(this);
    this.itemStore = new ItemStore(this);
  }
}

export default RootStore;
