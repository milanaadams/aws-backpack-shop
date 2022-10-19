import { Product } from '@models/product.model';
import { getById } from '../src/services/product.service';

describe('getById', () => {
  test('returns results by given id', () => {
    const expected: Product = { 
        id: "57433a09-9e2f-4eb1-a330-ea54797800bf",
        title: "UGRACE Vintage Laptop Backpack with USB Charging Port",
        description: "UNIQUE BACKPACK: Crafted with premium lightweight tear resistant oxford fabric and high grade polyester lining, simple, elegant and vintage casual daypacks.",
        price: 32,
        count: 24,
        image: "https://m.media-amazon.com/images/I/81CHrgt7FOL._AC_SX679_.jpg"
     }
    expect(getById('57433a09-9e2f-4eb1-a330-ea54797800bf')).toMatchObject(expected);
  });
});