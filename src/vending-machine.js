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
        price: '$1.20',
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
      return this.vmItems.reduce((acc, curr, index, array) => {
          if(curr.item === itemName){
            acc = array[index]
          }
          return acc
      },{});
    }
    throw new Error('Pleas enter a valid vending machine item name');
  }
}
module.exports = vendingMachine;