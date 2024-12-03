// src/hooks/useAppReadMe.js

import { useQuery } from '@tanstack/react-query';
import api from '../api/axios.js';

export const useMarkdown = (id) => {
  return useQuery({
    queryKey: ['AppReadMe', id],
    queryFn: async () => {
      const response = await api.get('api/analyze/result', {
        params: {
          repositoryName: 'Gatsby-Starter-Haon',
        },
      });
      // regularFiles 배열만 추출하여 저장
      if (response.data && response.data.regularFiles) {
        const regularFiles = response.data.regularFiles;
        const valuesArray = Object.values(regularFiles).map(
          (obj) => Object.values(obj)[0],
        );
        console.log(valuesArray);
        return valuesArray;
      }
      // return parseMarkdown(response.data);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

// export const useMarkdown = (id) => {
//   return useQuery({
//     queryKey: ['appreadme', id],
//     queryFn: async () => {
//       const response = await axios.get(`/api/markdown/${id}`);
//       return parseMarkdown(response.data);
//     },
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     cacheTime: 30 * 60 * 1000, // 30 minutes
//   });
// };
