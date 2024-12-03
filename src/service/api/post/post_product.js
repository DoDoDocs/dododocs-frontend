import { notification } from 'antd';

const PostProduct = () => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/api/analyze/result`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('young-dong'),
    },
    body: JSON.stringify({
      repositoryName: 'Gatsby-Starter-Haon',
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
        message: `왜  ❌`,
      });
      let err = await error.then();

      if (err.error.status === 401) {
        notification['error']({
          message: `로그인을 다시해 주세요 ❌`,
          description: err.error.code,
        });
      }
      console.log('왜  ❌\n' + err.error);
      console.log(err.error.code);
      //에러처리
      throw err;
    });
};

export default PostProduct;
