import { getItemFromLocalStorage, setItemFromLocalStorage } from '../utils/localStorage.js';
import { routeChange } from '../utils/route.js';
import { priceDelimiter } from '../utils/delimiter.js';

export default function SelectedOptions({ $target, initState }) {
  this.$component;
  this.state;

  this.init = () => {
    this.$component = document.createElement('div');
    $target.appendChild(this.$component);

    this.setState(initState);
  }

  // 총 가격 계산
  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;

    return selectedOptions.reduce(
      (acc, option) => acc + ((productPrice + option.optionPrice) * option.quantity), 0
    );
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const { product, selectedOptions } = this.state;
    if (product && selectedOptions) {
      this.$component.innerHTML = `
        <h3>선택된 상품</h3>
        <ul>
          ${selectedOptions.map(selectedOption => `
            <li>
              ${selectedOption.optionName} ${priceDelimiter(product.price + selectedOption.optionPrice)}원
              <input type="text" data-optionId="${selectedOption.optionId}" value="${selectedOption.quantity}">
            <li>
          `).join('')}
        </ul>
        <div class="ProductDetail__totalPrice">${this.getTotalPrice().toLocaleString()}원</div>
        <button class="OrderButton">주문하기</button>
      `
    }
  }

  this.init();

  this.$component.addEventListener('click', (e) => {
    const { selectedOptions } = this.state;
    if (e.target.className === 'OrderButton') { // 주문하기
      const cartData = getItemFromLocalStorage('products_cart') || [];

      setItemFromLocalStorage('products_cart', cartData?.concat(selectedOptions.map(selectedOption => ({
        productId: selectedOption.productId,
        optionId: selectedOption.optionId,
        quantity: selectedOption.quantity,
      }))));
      
      routeChange('/cart');
    }
  })

  this.$component.addEventListener('change', e => {
    if (e.target.tagName === 'INPUT') {
      let nextQuantity = parseInt(e.target.value);
      nextQuantity = nextQuantity <= 0 || Number.isNaN(nextQuantity) ? 1 : nextQuantity;
      const nextSelectedOptions = [ ...this.state.selectedOptions ];
      
      if (typeof nextQuantity === 'number') {
        const { product } = this.state;

        const optionId = parseInt(e.target.dataset.optionid);
        const option = product.productOptions.find(option => option.id === optionId);
        const selectedOptionIndex = nextSelectedOptions.findIndex(selectedOption => selectedOption.optionId === optionId);

        nextSelectedOptions[selectedOptionIndex].quantity = option.stock >= nextQuantity ? nextQuantity : option.stock;
        
        this.setState({
          ...this.state,
          selectedOptions: nextSelectedOptions
        });
      }
    }
  });
}