const vendingMachine = require('../src/vending-machine');

describe('Vending Machine', () => {
  
  describe('Querying for inventory', () => {
    beforeEach(()=>{
      test.subject = new vendingMachine();
    })
    describe('When inventory exists', () => {
      it('Should tell me the inventory data', () => {
        const result = test.subject.queryInventory('pepsi');
        expect(result.item).toBe('pepsi')
      })
    })
    describe('When inventory does not exist', () => {
      it('Should throw and error', () => {
        expect(() => test.subject.queryInventory('orange juice')).toThrow('No such item exist')
      })
    })
  })
})