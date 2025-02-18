import SelectedOptions from './SelectedOptions.js';

export default function ProductDetail({ $target, initState }) {
    this.$productDetail;
    this.state;
    this.selectedOptions;
    this.isInitialized;

    this.init = () => {
        this.$productDetail = document.createElement('div');
        this.$productDetail.className = 'ProductDetail';
        $target.appendChild(this.$productDetail);

        this.state = initState;
        this.selectedOptions = null;
        this.isInitialized = false;
    }    

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();

        if (this.selectedOptions) {
            this.selectedOptions.setState({
                ...this.state,
                selectedOptions: this.state.selectedOptions,
            });
        }
    }

    this.render = () => {
        const { product } = this.state;

        if (!this.isInitialized) {
            this.$productDetail.innerHTML = `
                <img src="${product.imageUrl}">
                <div class="ProductDetail__info">
                    <h2>${product.name}</h2>
                    <div class="ProductDetail__price">${product.price}원~</div>
                    <select>
                        <option>선택하세요.</option>
                        ${product.productOptions.map(option => `
                            <option value="${option.id}" ${option.stock === 0 ? 'disabled' : ''}>
                                ${option.stock === 0 ? '(품절) ' : ''}${product.name} ${option.name} ${option.price > 0 
                                    ?
                                    `(+${option.price.toLocaleString()}원)` : ''}
                            </option>
                        `).join('')}
                    </select>
                    <div class="ProductDetail__selectedOptions"></div>
                </div>
            `

            this.selectedOptions = new SelectedOptions({
                $target: this.$productDetail.querySelector('.ProductDetail__selectedOptions'),
                initState: {
                    product: this.state.product,
                    selectedOptions: this.state.selectedOptions
                }
            });

            this.isInitialized = true;
        }
    }

    this.init();
    this.render();

    // 이벤트 위임으로 이벤트 핸들링 
    this.$productDetail.addEventListener('change', (e) => {
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