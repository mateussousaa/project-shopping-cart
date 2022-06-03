require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Should test if fetchProducts is a function', async () => {
    expect(typeof fetchProducts).toBe('function');
    // Test if the fetch was called with right endpoint
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const response = await fetchProducts('computador');
    expect(fetch).toBeCalledWith(endpoint);
    // Test if the response is the expected response
    expect(response).toEqual(computadorSearch);
    // Test if fetchProducts is called with no parameter returns the expected error
    expect(fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
