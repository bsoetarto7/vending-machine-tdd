class vendingMachine {
  constructor(){
    this.vmItems =[
      {
        item: 'pepsi',
        price: '$1.20',
        quantity: 4
      },
      {
        item: 'coca-cola',
        price: '$1.30',
        quantity: 6
      },
      {
        item: 'dasani water',
        price: '$2.00',
        quantity: 5
      },
      {
        item: 'root beer',
        price: '$1.50',
        quantity: 5
      }
    ]
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
}
module.exports = vendingMachine;