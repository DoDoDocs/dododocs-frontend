import _ from '../../../config/config.js';
import { notification } from 'antd';

/**
 * @description 질문 답변 입력
 * @method PATCH
 * @request @headers youngdong token
 * @param {FormData}
 * @property {string} content
 */
const Patch_product_answer = (questionId, AnswerContent) => {
  return fetch(`${_.SERVER_URL}/api/product/v1/questions/${questionId}/answers`, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('young-dong'),
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ content: AnswerContent }),
  })
    .then((res) => {
      if (res.status === 500)
        throw Promise.resolve({ errorCode: 500, errorName: 'Server error' });
      if (!res.ok) throw res.json();
      notification['success']({
        message: `질문 답변 입력 완료`,
      });
      let data = res.json();

      return data;
    })
    .catch(async (error) => {
      let err = await error.then();
      console.log(err);
      notification['error']({
        message: `질문 답변 입력 실패 `,
      });

      if (err.error.status === 401) {
        //UNAUTHORIZED
        notification['error']({
          message: `로그인을 다시해 주세요 `,
          description: err.error.code,
        });
        return window.location.replace(_.HOST_URL + '/' + _.BASE_URL);
      }
      console.log('질문 답변 입력 실패 ❌\n' + err.error);
      console.log(err.error.code);
      //에러처리
      throw err;
    });
};

export default Patch_product_answer;
