import { computed } from 'mobx';
import ItemPrice from './ItemPrice';

export default class Item {
  id: string;
  title: string;
  price: ItemPrice;
  picture: string;
  condition: string;
  freeShipping: boolean;
  addressStateName: string;
  soldQuantity?: number;
  description?: string;

  constructor(data: any) {
    this.id = data['id'];
    this.title = data['title'];
    this.price = new ItemPrice(data['price']);
    this.picture = data['picture'];
    this.condition = data['condition'];
    this.freeShipping = data['free_shipping'];
    this.addressStateName = data['address_state_name'];
    this.soldQuantity = data['sold_quantity'];
    this.description = data['description'];
  }

  @computed
  get infoStr() {
    let condition = this.condition === 'new' ? 'Nuevo' : 'Usado';
    let solds = `${this.soldQuantity} vendidos`;
    return `${condition} - ${solds}`;
  }
}
