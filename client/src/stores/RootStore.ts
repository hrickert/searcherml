import { action, computed, observable } from 'mobx';
import ItemStore from './ItemStore';

class RootStore {
  itemStore: ItemStore;
  @observable windowWidth: number = window.innerWidth;

  constructor() {
    this.itemStore = new ItemStore(this);
    if (typeof window === 'object') {
      // Metodo que se ejecuta al resize de la ventana.
      window.addEventListener('resize', this.onResize.bind(this), false);
    }
  }

  @computed
  get isMobile() {
    return this.windowWidth < 750;
  }

  @action
  onResize(resizeEvent: any) {
    this.windowWidth = resizeEvent.currentTarget.innerWidth;
  }
}

export default RootStore;
