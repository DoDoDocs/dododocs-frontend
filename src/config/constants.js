// src/config/constants.js
export const LAYOUT = {
  HEADER: {
    TOTAL_DVH: 11.5,
    T_DVH: 3.5,
    HEIGHT_DVH: 8,

    PADDING: '0 20px',
    Z_INDEX: 100,
  },
};

// 쿼리 키 상수
export const QUERY_KEYS = {
  AUTH: {
    ROOT: ['auth'],
    USER: ['auth', 'user'],
    TOKEN: ['auth', 'token'],
  },
  USERS: {
    ROOT: ['users'],
    PROFILE: (userId) => ['users', userId, 'profile'],
    PREFERENCES: (userId) => ['users', userId, 'preferences'],
  },
  POSTS: {
    ROOT: ['posts'],
    DETAIL: (postId) => ['posts', postId],
    COMMENTS: (postId) => ['posts', postId, 'comments'],
  },
};
