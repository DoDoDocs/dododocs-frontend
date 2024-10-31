import _ from '../../../config/config.js';
import { notification } from 'antd';

/**
 * @description 상품 등록
 * @method POST
 * @request @headers youngdong token
 * @param {FormData}
 * @property {object} dto
 * @property {string} dto.title
 * @property {number} dto.cost
 * @property {number} dto.discount
 * @property {number} dto.amount
 * @property {string} dto.description
 * @property {Image} thumbnailImg
 * @property {Image} infoImg
 */
const PostProduct = (productFormData) => {
  return fetch(`${_.SERVER_URL}/api/product/v1/products`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('young-dong'),
    },
    body: productFormData,
  })
    .then((res) => {
      if (res.status === 500)
        throw Promise.resolve({ errorCode: 500, errorName: 'Server error' });
      if (!res.ok) throw res.json();

      let data = res.json();
      return data;
    })
    .catch(async (error) => {
      notification['error']({
        message: `상품 등록 실패 ❌`,
      });
      let err = await error.then();

      if (err.error.status === 401) {
        notification['error']({
          message: `로그인을 다시해 주세요 ❌`,
          description: err.error.code,
        });
      }
      console.log('상품 등록 실패 ❌\n' + err.error);
      console.log(err.error.code);
      //에러처리
      throw err;
    });
};

export default PostProduct;
