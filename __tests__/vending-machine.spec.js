const vendingMachine = require('../src/vending-machine');

describe('Vending Machine', () => {
  beforeEach(()=>{
    test.subject = new vendingMachine();
  })
  describe('Querying for inventory', () => {
    describe('When inventory exists', () => {
      it('Should tell me the inventory data', () => {
        const result = test.subject.queryInventory('pepsi');
        expect(result).toBe('pepsi')
      })
    })
  })
})