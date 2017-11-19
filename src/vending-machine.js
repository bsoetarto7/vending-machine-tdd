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
}
module.exports = vendingMachine;