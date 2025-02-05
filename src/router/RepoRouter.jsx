import React from 'react';
import Repo from "../pages/RepoPage/index.jsx"
import { Outlet } from 'react-router-dom';

const RepoRouter = () => {
  return (
    <>
      <Repo />
      <Outlet /> {/* 모달이 여기에 렌더링됨 */}
    </>

  );
};

export default RepoRouter;
