import { action } from 'mobx';
import _ from 'lodash';
import ItemStore from './ItemStore';

class RootStore {
  itemStore: ItemStore;

  constructor() {
    this.itemStore = new ItemStore(this);
  }

  /**
   * Metodo encargado de inicializar la informacion basica de la aplicacion
   */
  @action
  start(): Promise<void> {
    // this.uiStore.incrementPendingProgress();

    return new Promise((resolve, reject) => {
      // Promise.all()
      //   .then(() => {
      //     resolve();
      //   })
      //   .catch((err) => {
      //     // this.uiStore.decrementPendingProgress();
      //     reject(err);
      //   });
      resolve();
    });
  }
}

export default RootStore;
