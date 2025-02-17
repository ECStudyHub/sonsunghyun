import { getProductDetail } from '../api/api.js';
import LocalStorageUtil from '../utils/localStorage.js';
import { routeChange } from '../utils/route.js';
import Cart from './Cart.js';

export default function CartPage({ $target }) {
  const $page = document.createElement('div');
  $page.className = 'CartPage';

  $page.innerHTML = '<h1>장바구니</h1>'

  let cartComponent = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  const cartData = LocalStorageUtil.getItem('products_cart', []);
  this.state = {
    products: null
  }

  this.render = () => {
    if (cartData.length === 0) {
      alert('장바구니가 비어있습니다.')
      routeChange('/web/');
    } else {
      $target.appendChild($page);
      if (this.state.products && !cartComponent) {
        cartComponent = new Cart({
          $target: $page,
          initState: this.state.products
        })
      }
    }
  }

  this.fetchProducts = async () => {
    const products = await Promise.all(cartData.map(async (cartItem) => {
      const product = await getProductDetail(productId);
      const selectedOption = product.productOptions.find(option => option.id === cartItem.optionId);

      return {
        imageUrl: product.imageUrl,
        productName: product.name,
        quantity: cartItem.quantity,
        productPrice: product.price,
        optionName: selectedOption.name,
        optionPrice: selectedOption.price
      }
    }))

    this.setState({ products });
  }

  this.fetchProducts();
}