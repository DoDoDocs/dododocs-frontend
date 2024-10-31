import { SERVER_URL } from '../config'; // 서버 URL을 별도의 설정 파일에서 관리
import { notification } from 'antd';

const fetchCategoryProducts = async ({ category, subCategory }) => {
  const endpoint = new URL(`${SERVER_URL}/api/product/v1/products/category/`);

  endpoint.searchParams.append('keyword', category);
  if (subCategory) {
    endpoint.searchParams.append('sub', subCategory);
  }

  const token = localStorage.getItem('young-dong');

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    let err = await error.then();
    console.log(err);
    notification['error']({
      message: `카테고리 상품 불러오기 실패 ❌`,
      description: err.error.message || err.error.status,
      duration: 2,
    });
    console.log(
      '카테고리 상품 불러오기 실패 ❌\n' +
        err.error.message +
        '\n' +
        err.error.status +
        '\n' +
        err.error.code,
    );
    throw err;
  }
};

/**
 * @description 카테고리 상품 불러오기
 * @param {Object} params
 * @param {string} params.category - SNACK, WINE, DAIRY, MEAT 중 하나
 * @param {string} [params.subCategory] - CHOCOJELLY, REDWINE, WHITEWINE, MILK, ICECREAM, BEEF, PORK 중 하나 (선택적)
 * @returns {Promise<Object>} 카테고리 상품 데이터
 */
export const getCategoryProducts = (params) => fetchCategoryProducts(params);
