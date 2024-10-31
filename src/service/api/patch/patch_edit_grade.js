import _ from '../../../config/config.js';
import { notification } from 'antd';

/**
 * @description 시그니처 수정
 * @method PATCH
 * @request @headers youngdong token
 * @param {string} grade
 * @param {Number} productId
 */
const PatchEditGrade = (grade, productId) => {
  return fetch(`${_.SERVER_URL}/api/product/v1/product/grade`, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('young-dong'),
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      grade: grade,
      productId: productId,
    }),
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
        message: `시그니처 수정 실패 ❌`,
      });
      let err = await error.then();
      console.log(err);
      if (err.error.status === 401) {
        notification['error']({
          message: `로그인을 다시해 주세요 ❌`,
          description: err.error.code,
        });
      }
      console.log('시그니처 수정 실패 ❌\n' + err.error.message);
      console.log(err.error.code);
      //에러처리
      throw err;
    });
};

export default PatchEditGrade;
