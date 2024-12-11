// src/hooks/useAddRepo.js
import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRepository } from '../api/index.js';
import useRepoStore from '../store/useRepoStore';

const initialFormState = {
  name: null,
  branch: '',
  language: 'English',
  isTestFile: false,
};

export const useAddRepo = (onSuccess) => {
  const [formData, setFormData] = useState(initialFormState);
  const [validationErrors, setValidationErrors] = useState({});

  const queryClient = useQueryClient();
  const addRepoToStore = useRepoStore((state) => state.addRepo);

  const {
    mutate: addRepo,
    isLoading,
    error,
  } = useMutation({
    // mutationFn: addRepository,
    onSuccess: (newRepo) => {
      // React Query 캐시 업데이트
      // TODO : api구현 후 주석 해제
      // queryClient.invalidateQueries({ queryKey: ['repositories'] });

      // Zustand store에 새 레포지토리 추가
      const repoToAdd = {
        key: newRepo.id || String(Date.now()), // API 응답에 따라 조정
        Repository: newRepo.name || formData.name,
        Status: 'In Progress',
        Branch: formData.branch,
        Action: 'Delete',
      };

      addRepoToStore(repoToAdd);

      // 폼 초기화 및 성공 콜백
      resetForm();
      onSuccess?.(newRepo);
    },
  });

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setValidationErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.name) errors.name = 'Repository name is required';
    if (!formData.branch.trim()) errors.branch = 'Branch name is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!validateForm()) return false;
      addRepo(formData);
    },
    [formData, addRepo, validateForm],
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setValidationErrors({});
  }, []);

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
