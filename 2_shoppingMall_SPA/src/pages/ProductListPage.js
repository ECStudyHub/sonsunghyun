import { getProduct } from '../api/api.js';
import LocalStorageUtil from '../utils/localStorage.js';
import { routeChange } from '../utils/route.js';

// product = {
//     id: number;
//     name: string;
//     imageUrl: string;
//     price: number; 
// }
export default function ProductListPage({ $target }) {
    this.$page;
    this.productList = [];

    this.init = async () => {
        this.$page = document.createElement('div');
        this.$page.className = 'ProductListPage';
        $target.appendChild(this.$page);
      
        this.productList = LocalStorageUtil.getItem('productList');
        
        if(this.productList == null) {
            this.productList = await getProduct({
                setLoading: () => {}, 
                finishLoading: () => {},
            });
            LocalStorageUtil.setItem('productList', this.productList);
        }
    }

    this.render = () => {
        this.$page.innerHTML = `
            <h1>상품목록</h1>
            <ul>
                ${this.productList.map(product => (
                    `<li class="Product" data-productId=${product.id}>
                        <img src=${product.imageUrl} />
                        <div class="Product__info">
                            <div>${product.name}</div>
                            <div>${product.price.toLocaleString()} ~</div>
                        </div>
                    </li>`
                )).join('')}
            </ul>
        `;
    }

    this.init();

    this.$page.addEventListener('click', (e) => {
        const $li = e.target.closest('li');
        const { productid } = $li.dataset;
    
        if (productid) {
            routeChange(`/products/${productid}`);
        }
    });
}