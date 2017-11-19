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
}
module.exports = vendingMachine;