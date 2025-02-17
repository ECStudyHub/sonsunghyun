import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";
import { init } from './utils/route.js'

export default function App() {
    const $app = document.querySelector(".App");

    this.route = () => {
        const { pathname } = location
    
        $app.innerHTML = ''
    
        if (pathname === '/' || pathname === '/index.html') {
            console.log('new ProductListPage');
            new ProductListPage({ $target: $app }).render();
        } else if (pathname.indexOf('/products/') === 0) {
            const [, , productId] = pathname.split('/');
            new ProductDetailPage({ $target: $app, productId }).render();
        } else if (pathname === '/cart') {
            new CartPage({ $target: $app }).render();
        }
    }

    window.addEventListener('popstate', this.route);

    // ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수가 호출되게 하는 효과
    init(this.route);
    
    this.route();
}
