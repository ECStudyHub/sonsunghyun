import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";
import { init } from './utils/route.js'

export default function App() {
    const $app = document.querySelector(".App");

    this.route = () => {
        const { pathname } = location
        console.log(pathname);
        const routePath = pathname.replace('/2_shoppingMall_SPA', '');
        
        //라우팅 전에 페이지 초기화
        $app.innerHTML = ''
    
        if (routePath.indexOf('/products/') === 0) {
            const productId = routePath.split('/').at(-1); //last element
            new ProductDetailPage({ $target: $app, productId }).render();
        } else if (routePath === '/cart') {
            new CartPage({ $target: $app }).render();
        } else {
            //routePath === '/' || routePath === '/index.html'
            new ProductListPage({ $target: $app }).render();
        }
    }

    window.addEventListener('popstate', this.route);
    window.addEventListener('beforeunload', (data) => {
        //화면 전환시 홈 화면으로 이동
        this.route();
    });

    // custom 이벤트 발생 시 마다 라우팅
    init(this.route);
    
    this.route();
}
