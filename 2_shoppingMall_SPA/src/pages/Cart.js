import { routeChange } from '../utils/route.js';
import LocalStorageUtil from '../utils/localStorage.js';

export default function Cart({ $target, initState }) {
  this.$component;
  this.state;

  this.init = () => {
    this.$component = document.createElement('div');
    this.$component.className = 'Cart';
    this.state = initState;

    $target.appendChild(this.$component);
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.getTotalPrice = () => {
    return this.state.reduce(
      (acc, option) => acc + ((option.productPrice + option.optionPrice) * option.quantity), 0)
  }

  this.render = () => {
    this.$component.innerHTML = `
      <ul>
        ${this.state.map(cartItem => `
          <li class="Cart__item">
            <img src="${cartItem.imageUrl}">
            <div class="Cart__itemDescription">
              <div>${cartItem.productName} ${cartItem.optionName} ${cartItem.quantity}개</div>
              <div>${cartItem.productPrice + cartItem.optionPrice}원</div>
            </div>
          </li>  
        `).join('')}
      </ul>
      <div class="Cart__totalPrice">
        총 상품가격 ${this.getTotalPrice().toLocaleString()}원
      </div>
      <button class="OrderButton">주문하기</button>    
    `
    // return this.$component;
  }

  this.init();
  this.render();

  this.$component.addEventListener('click', e => {
      if (e.target.className === 'OrderButton') {
      alert('주문 되었습니다!');
      LocalStorageUtil.removeItem('products_cart');
      routeChange('/');
    }
  })
}