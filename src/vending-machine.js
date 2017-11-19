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
    let items = this.vmItems
    items.forEach((item) => {
      item.quantity = 10
    })
    return items
  }

  refillChange(){
    let moneyChange = this.vmChange
    moneyChange.forEach((change) => {
      change.quantity = 20
    })
    return moneyChange
  }

  buyItem(payment){
    if(typeof payment === 'number' && payment > 0){
      let items = this.vmItems.filter((items) => {
        return items.price <= payment
      })
      return items
    }
    return []
  }

  payForItem(itemName, payment){
    if(typeof itemName === 'string' && itemName && typeof payment === 'number' && payment > 0){
      let item = this.vmItems.reduce((acc, curr) => {
        if(curr.item === itemName){
          acc = curr
        }
        return acc
      },{})
      let change = (payment - item.price).toFixed(2);
      let changeToCoins = [];
      for(let i = 0; i<this.vmChange.length; i++){
        if(this.vmChange[i].value <= change){
          change -= this.vmChange[i].value;
          changeToCoins.push(this.vmChange[i])
          i = 0
        }
      }
      return {
        item: [item],
        change: changeToCoins
      }
    }
  }
}

module.exports = vendingMachine;