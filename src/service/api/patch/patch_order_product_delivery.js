import _ from '../../../config/config.js';
import { notification } from 'antd';

/**
 * @description 관리자가 해당 주문 제품에 대한 배송 정보 입력
 * @method PATCH
 * @request @headers youngdong token
 * @param {FormData}
 * @property {object} deliveryInfo
 * @property {string} deliveryInfo.deliveryCompany
 * @property {string} deliveryInfo.trackingNumber
 */
const PatchOrderProductDelivery = (orderProductId, deliveryInfo) => {
  return fetch(
    `${_.SERVER_URL}/api/order/v1/admin/order/product/${orderProductId}/delivery`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('young-dong'),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(deliveryInfo),
    },
  )
    .then((res) => {
      if (res.status === 500)
        throw Promise.resolve({ errorCode: 500, errorName: 'Server error' });
      if (!res.ok) throw res.json();
      notification['success']({
        message: `배송정보 입력 완료`,
      });
      let data = res.json();
      return data;
    })
    .catch(async (error) => {
      let err = await error.then();
      console.log(err);
      notification['error']({
        message: `배송정보 입력 실패 `,
      });

      if (err.error.status === 401) {
        //UNAUTHORIZED
        notification['error']({
          message: `로그인을 다시해 주세요 `,
          description: err.error.code,
        });
        return window.location.replace(_.HOST_URL + '/' + _.BASE_URL);
      }
      console.log('배송정보 입력 실패 ❌\n' + err.error);
      console.log(err.error.code);
      //에러처리
      throw err;
    });
};

export default PatchOrderProductDelivery;
