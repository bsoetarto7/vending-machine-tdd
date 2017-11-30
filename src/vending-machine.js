var data = require('./data')

class vendingMachine {
  constructor(){
    this.vmItems = data.items
    this.vmChange = data.change
  }
  queryInventory(itemName){
    // console.log(itemName);
    if(typeof itemName === 'string' && itemName){
      const item = this.vmItems.filter((item) => {
        return item.item == itemName
      });
      if(item.length > 0){
        return item
      }else{
        throw new Error('No such item exist');
      }

    }
    throw new Error('Please enter a valid vending machine item name');
  }

  refillInventory(){
    this.vmItems.forEach((item) => {
      item.quantity = 10
    })
    return this.vmItems
  }

  refillChange(){
    this.vmChange.forEach((change) => {
      change.quantity = 20
    })
    return this.vmChange
  }

  buyItem(payment){
    if(typeof payment === 'number' && payment > 0){
      let items = this.vmItems.filter((items, index) => {
        if(items.price <= payment){
          this.vmItems[index].quantity -= 1
          return items.price <= payment
        }
      })
      return items
    }
    return []
  }

  payForItem(itemName, payment){
    if(typeof itemName === 'string' && itemName && typeof payment === 'number' && payment > 0){
      let itemsSelected = []
      this.vmItems.forEach((item) => {
        if(item.item === itemName){
          item.quantity -= 1;
          itemsSelected.push(item);
        }
      })
      let change = (payment - itemsSelected[0].price).toFixed(2);
      let changeToCoins = [];
      for(let i = 0; i<this.vmChange.length; i++){
        if(this.vmChange[i].value <= change){
          change -= this.vmChange[i].value;
          this.vmChange[i].quantity -= 1
          changeToCoins.push(this.vmChange[i])
          i = 0
        }
      }
      return {
        item: itemsSelected,
        change: changeToCoins
      }
    }
  }
}

module.exports = vendingMachine;