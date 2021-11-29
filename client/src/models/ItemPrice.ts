import { computed } from 'mobx';

export default class ItemPrice {
  currency: string;
  amount: number;
  decimals: number;

  constructor(data: any) {
    this.currency = data['currency'];
    this.amount = data['amount'];
    this.decimals = data['decimals'] || 0;
  }

  @computed
  get priceStr() {
    return `${this.currency} ${this.amount.toFixed(this.decimals)}`;
  }
}
