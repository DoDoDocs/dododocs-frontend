// src/hooks/useAddRepo.js
import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { docsAPI } from '../api/index.js';

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
        korean: uploadRepo.korean,
        includeTest: uploadRepo.isTestFile,
      });
    },
    onSuccess: (response) => {
      // React Query 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['addRepositories'] });

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
    console.log('AddRepoFormData👋👋👋', formData);
    if (!formData.name) errors.name = 'Repository name is required';
    if (!formData.branch.trim()) errors.branch = 'Branch name is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

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
