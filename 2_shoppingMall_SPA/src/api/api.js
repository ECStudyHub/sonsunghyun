
import { mockProcuctList, mockProductDetail } from './mockdata.js';
const URL = 'https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products';

// 상품 목록 조회
// https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products
// 상품 상세 조회
// https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/{productId}'

export async function getProduct({ id = null }) {
    try {
        if (id) {
            return Promise.resolve(mockProductDetail[id]);
            // const response = await fetch(URL);
        } else {
            return Promise.resolve(mockProcuctList);
            // const response = await fetch(`${URL}/${id}`);
        }

        // if(!response.ok) {
        //     throw new Error('잠시 후에 다시 시도해 주세요');
        // }

        // const data = await response.json();
        // return data;
    } catch (e) {
        console.log(e);
        throw new Error(`에러가 발생했습니다. ${e.message}`);
    }
}