import { getProduct } from '../api/api.js';
import { getItemFromLocalStorage } from '../utils/localStorage.js';
import { routeChange } from '../utils/route.js';
import Cart from '../components/Cart.js';

export default function CartPage({ $target }) {
  this.$page;
  this.cartComponent = null;
  this.cartData = [];
  this.state = {
    products: null,
  }

  this.init = async () => {
    this.$page = document.createElement('div');
    this.$page.className = 'CartPage';
    this.$page.innerHTML = '<h1>장바구니</h1>'

    this.cartData = getItemFromLocalStorage('products_cart') || [];

    const products = await Promise.all(this.cartData.map(async (cartItem) => {
      const product = await getProduct({ id: cartItem.productId });
      const selectedOption = product.productOptions.find(option => option.id === cartItem.optionId);

      return {
        imageUrl: product.imageUrl,
        productName: product.name,
        quantity: cartItem.quantity,
        productPrice: product.price,
        optionName: selectedOption.name,
        optionPrice: selectedOption.price
      }
    }));

    this.setState({ products });
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if (this.cartData.length === 0) {
      alert('장바구니가 비어있습니다.');
      routeChange('/');
    } else {
      $target.appendChild(this.$page);
      if (this.state.products && !this.cartComponent) {
        this.cartComponent = new Cart({
          $target: this.$page,
          initState: this.state.products
        });
      }
    }
  }

  this.init();
}