import { getProduct } from '../api/api.js';
import ProductDetail from './ProductDetail.js';

export default function ProductDetailPage({ $target, productId }) {
  this.$page;
  this.state = {
    productId,
    product: null,
  }

  this.init = async () => {
    this.$page = document.createElement('div');
    this.$page.className = 'ProductDetailPage';
    this.$page.innerHTML = '<h1>상품 정보</h1>';

    const { productId } = this.state;
    const product = await getProduct({
        id: productId
    });
    
    this.setState({
      ...this.state,
      product
    });
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if (!this.state.product) {
      $target.innerHTML = 'Loading...';
    } else {
      $target.innerHTML = '';
      $target.appendChild(this.$page);

      new ProductDetail({
        $target: this.$page,
        initState: {
          product: this.state.product,
          selectedOptions: [],
        },
      });
    }
  }

  this.init();
}