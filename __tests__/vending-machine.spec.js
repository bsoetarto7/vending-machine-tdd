const vendingMachine = require('../src/vending-machine');

describe('Vending Machine', () => {
  
  describe('Querying for inventory', () => {
    beforeEach(()=>{
      test.subject = new vendingMachine();
    })
    describe('When inventory exists', () => {
      it('Should tell me the inventory data', () => {
        const result = test.subject.queryInventory('pepsi');
        expect(result).toEqual(expect.arrayContaining([expect.objectContaining({item: 'pepsi'})]))
      })
    })
    describe('When inventory does not exist', () => {
      it('Should throw and error', () => {
        expect(() => test.subject.queryInventory('orange juice')).toThrow('No such item exist')
      })
      it('Should throw and error', () => {
        expect(() => test.subject.queryInventory('')).toThrow('Please enter a valid vending machine item name')
      })
    })
  })

  describe('Refilling inventory', () => {
    beforeEach(()=>{
      test.subject = new vendingMachine();
    })
    describe('When refilling inventory', () => {
      it('Should fill up each item quantity back to 10', () => {
        const result = test.subject.refillInventory();
        for (let i = 0; i < result.length; i++){
          expect(result[i]).toEqual(expect.objectContaining({quantity: 10}));
        }
      })
    })
  })

  describe('Refilling vending machine change', () => {
    beforeEach(()=>{
      test.subject = new vendingMachine();
    })
    describe('When refilling refilling vending machine change', () => {
      it('Should fill each denomination of coins quantity back to 20', () => {
        const result = test.subject.refillChange();
        for (let i = 0; i < result.length; i++){
          expect(result[i]).toEqual(expect.objectContaining({quantity: 20}));
        }
      })
    })
  })

  describe('Query item base on payment received', () => {
    beforeEach(()=>{
      test.subject = new vendingMachine();
    })
    describe('When payment is made', () => {
      describe('When $1.40 is received by vending machine', () => {
        it('Should return the items base on payment', () => {
          expectedResult = [
            {
              "item": "pepsi",
              "price": 1.20,
              "quantity": 10
            },
            {
              "item": "coca-cola",
              "price": 1.30,
              "quantity": 10
            }
          ]
          const result = test.subject.buyItem(1.40);
          expect(result).toEqual(expect.arrayContaining(expectedResult));
        })
      })
      describe('When $2.00 is received by vending machine', () => {
        it('Should return the items base on payment', () => {
          const result = test.subject.buyItem(2.00);
        })
      })
    })
    describe('When no payment is made', () => {
      it('Should return no item', () => {
        const result = test.subject.buyItem();
        expect(result).toEqual(expect.arrayContaining([]));
      })
    })
  })

})