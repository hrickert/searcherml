import { observable, action, computed } from 'mobx';

import RootStore from './RootStore';

export default class UiStore {
  rootStore: RootStore;
  @observable pendingProgress: number = 0;
  @observable windowWidth: number = window.innerWidth;
  @observable windowHeight: number = window.innerHeight;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  onResize(resizeEvent: any) {
    this.windowHeight = resizeEvent.currentTarget.innerHeight;
    this.windowWidth = resizeEvent.currentTarget.innerWidth;

    if (typeof window === 'object') {
      window.addEventListener('resize', this.onResize.bind(this), false);
    }
  }

  @action
  incrementPendingProgress(): void {
    this.pendingProgress++;
  }

  @action
  decrementPendingProgress(): void {
    this.pendingProgress--;
  }

  // https://www.freecodecamp.org/news/css-media-queries-breakpoints-media-types-standard-resolutions-and-more/
  @computed
  get isMobileDevice() {
    return this.windowWidth < 480;
  }

  @computed
  get isTablet() {
    return this.windowWidth < 768;
  }

  @computed
  get isDesktopSmallScreen() {
    return this.windowWidth < 1024;
  }
}
