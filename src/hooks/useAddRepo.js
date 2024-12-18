// src/hooks/useAddRepo.js
import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { docsAPI } from '../api/index.js';
import useRepoStore from '../store/repoStore.js';

const initialFormState = {
  name: null,
  branch: '',
  korean: false,
  isTestFile: false,
};

export const useAddRepo = (onSuccess) => {
  const [formData, setFormData] = useState(initialFormState);
  const [validationErrors, setValidationErrors] = useState({});

  const queryClient = useQueryClient();
  const addRepoToStore = useRepoStore((state) => state.addRepo);
  const reposLength = useRepoStore((state) => state.repos.length);
  const {
    mutate: addRepo,
    isLoading,
    error,
    reset: resetMutation, // react-query의 reset 함수
  } = useMutation({
    mutationFn: (uploadRepo) => {
      return docsAPI.postUploadRepo({
        repositoryName: uploadRepo.name,
        branchName: uploadRepo.branch,
        korean: uploadRepo.language === 'korean',
        includeTest: uploadRepo.isTestFile,
      });
    },
    onSuccess: (response) => {
      // Zustand store에 새 레포지토리 추가
      const repoToAdd = {
        key: String(reposLength),
        Repository: formData.name,
        Status: isLoading ? 'In Progress' : 'Code Imported',
        Branch: formData.branch,
        Action: 'Delete',
      };

      addRepoToStore(repoToAdd);

      // React Query 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['repositories'] });

      // 폼 초기화 및 성공 콜백
      resetForm();
      onSuccess?.(response);
    },
    onError: (error) => {
      console.error('Repository upload failed:', error);
      setValidationErrors((prev) => ({
        ...prev,
        submit: error.message || 'Failed to upload repository',
      }));
    },
  });

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // 에러 메시지 초기화
    setValidationErrors((prev) => ({
      ...prev,
      [field]: null,
      submit: null,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.name) errors.name = 'Repository name is required';
    if (!formData.branch.trim()) errors.branch = 'Branch name is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // TODO 영상제출이후 수정
  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!validateForm()) {
        console.log('Validation failed');
        return { validateSuccess: false, error: 'Validation failed' };
      }
      //     console.log('Submitting repository:', formData);
      //     addRepo(formData);
      //   },
      //   [formData, addRepo, validateForm],
      // );
      addRepo(formData);
    },
    [formData, addRepo, validateForm],
  );

  // const handleSubmit = () => {
  //   const repoToAdd = {
  //     key: String(reposLength),
  //     Repository: formData.name,
  //     Status: 'Code Imported',
  //     Branch: formData.branch,
  //     Action: 'Delete',
  //   };

  //   addRepoToStore(repoToAdd);
  // };

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setValidationErrors({});
    resetMutation(); // mutation 상태 초기화
  }, [resetMutation]);

  return {
    formData,
    validationErrors,
    isLoading,
    error: error?.message,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
