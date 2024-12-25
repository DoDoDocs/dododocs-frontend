// src/hooks/useAppModal.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAppModal = () => {
  const [AppRepo, setAppRepo] = useState(null);
  const navigate = useNavigate();

  const openModal = (repo) => {
    setAppRepo(repo);
    navigate(`/repositories/${repo.repositoryName}`);
  };

  const closeModal = () => {
    setAppRepo(null);
    navigate('/repositories');
  };

  return {
    AppRepo,
    setAppRepo,
    openModal,
    closeModal,
  };
};
export default useAppModal;
