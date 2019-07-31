import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import prepareProductsToAdd from './../../../helpers/prepareProductsToAdd';

jest.mock('@vue-storefront/core/modules/cart/helpers/productChecksum', () => () => 'some checksum')

const createProduct = ({ type_id }): CartItem => ({
  type_id,
  product_links: [
    {
      link_type: 'associated',
      product: {
        sku: 'SK-001'
      }
    }
  ]
} as any as CartItem)

describe('Cart prepareProductsToAdd', () => {
  it('returns associated products', async () => {
    const product = createProduct({ type_id: 'grouped' })
    expect(prepareProductsToAdd(product)).toEqual([{ sku: 'SK-001' }])
  });

  it('returns products with checksum applied', async () => {
    const product = createProduct({ type_id: 'bundle' })
    expect(prepareProductsToAdd(product)).toEqual([{ ...product, checksum: 'some checksum' }])
  });
});