const vendingMachine = require('../src/vending-machine');

describe('Vending Machine', () => {
  
  describe('Printing inventory', () => {
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

  describe('Re-supplying change', () => {
    beforeEach(()=>{
      test.subject = new vendingMachine();
    })
    describe('When re-supplying vending machine coins for change', () => {
      it('Should fill each denomination of coins quantity back to 20', () => {
        const result = test.subject.refillChange();
        for (let i = 0; i < result.length; i++){
          expect(result[i]).toEqual(expect.objectContaining({quantity: 20}));
        }
      })
    })
  })

  describe('Dispensing inventory based on payment', () => {
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
              "quantity": 9
            },
            {
              "item": "coca-cola",
              "price": 1.30,
              "quantity": 9
            }
          ]
          const result = test.subject.buyItem(1.40);
          expect(result).toEqual(expect.arrayContaining(expectedResult));
        })
      })
      describe('When $1.90 is received by vending machine', () => {
        it('Should return the items base on payment', () => {
          expectedResult = [
            {
              "item": "pepsi",
              "price": 1.20,
              "quantity": 8
            },
            {
              "item": "coca-cola",
              "price": 1.30,
              "quantity": 8
            },
            {
              "item": "root beer",
              "price": 1.50,
              "quantity": 9
            }
          ]
          const result = test.subject.buyItem(1.90);
          expect(result).toEqual(expect.arrayContaining(expectedResult));
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

  describe('Returning change & item selected', () => {
    beforeEach(()=>{
      test.subject = new vendingMachine();
    })
    describe('When $1.40 is paid and pepsi is the selected item', () => {
      it('Should return an array containing object of pepsi', () => {
        expectedResult = [
          {
            "item": "pepsi",
            "price": 1.20,
            "quantity": 7
          }
        ]
        const result = test.subject.payForItem('pepsi', 1.40);
        expect(result.item).toEqual(expect.arrayContaining(expectedResult))
      })
      it('Should return an array of object that contains the coins for change', () => {
        expectedResult = [
          {
            "denomination": "dime",
            "value": 0.10,
            "quantity": 16
          },
          {
            "denomination": "dime",
            "value": 0.10,
            "quantity": 16
          }
        ]
        const result = test.subject.payForItem('pepsi', 1.40);
        expect(result.change).toEqual(expect.arrayContaining(expectedResult))
      })

    })
  })

})