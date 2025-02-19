import SelectedOptions from './SelectedOptions.js';
import { priceDelimiter } from '../utils/delimiter.js';

export default function ProductDetail({ $target, initState }) {
    this.$component;
    this.state;
    this.selectedOptionsComponent = null;
    this.isInitialized = false;

    this.init = () => {
        this.$component = document.createElement('div');
        this.$component.className = 'ProductDetail';
        $target.appendChild(this.$component);

        this.setState(initState);
    }    

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();

        if (this.selectedOptionsComponent) {
            this.selectedOptionsComponent.setState({
                ...this.state,
                selectedOptions: this.state.selectedOptions,
            });
        }
    }

    this.render = () => {
        const { product } = this.state;

        if (!this.isInitialized) {
            this.$component.innerHTML = `
                <img src="${product.imageUrl}">
                <div class="ProductDetail__info">
                    <h2>${product.name}</h2>
                    <div class="ProductDetail__price">${priceDelimiter(product.price)}원~</div>
                    <select>
                        <option>선택하세요.</option>
                        ${product.productOptions.map(option => `
                            <option value="${option.id}" ${option.stock === 0 ? 'disabled' : ''}>
                                ${option.stock === 0 ? '(품절) ' : ''}${product.name} ${option.name} 
                                ${option.price > 0 ? `(+${priceDelimiter(option.price)}원)` : ''}
                            </option>
                        `).join('')}
                    </select>
                    <div class="ProductDetail__selectedOptions"></div>
                </div>
            `

            this.selectedOptionsComponent = new SelectedOptions({
                $target: this.$component.querySelector('.ProductDetail__selectedOptions'),
                initState: {
                    product: this.state.product,
                    selectedOptions: this.state.selectedOptions
                }
            });

            this.isInitialized = true;
        }
    }

    this.init();

    this.$component.addEventListener('change', (e) => {
        if (e.target.tagName === 'SELECT') {
            const selectedOptionId = parseInt(e.target.value);
            const { product, selectedOptions } = this.state;
            const option = product.productOptions.find(option => option.id === selectedOptionId)
            const selectedOption = selectedOptions.find(selectedOption => selectedOption.optionId === selectedOptionId)

            if (option && !selectedOption) {
                const nextSelectedOptions = [
                    ...selectedOptions,
                    {
                        productId: product.id,
                        optionId: option.id,
                        optionName: option.name,
                        optionPrice: option.price,
                        quantity: 1
                    }
                ];

                this.setState({
                    ...this.state,
                    selectedOptions: nextSelectedOptions
                });
            }
        }
    })
}