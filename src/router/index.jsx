//TODO ProtectedRoute by role 
import React, { Suspense, lazy } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectUserRole } from '../entities/user/index.js';
// import { notification } from 'antd';
import Home from './HomeRouter.jsx';
import Docs from './DocsRouter.jsx';
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const role = useSelector(selectUserRole);
//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return notification['error']({
//       message: role === "GUEST" ? `로그인이 필요합니다.` : "권한이 없습니다.",
//       description: role === "GUEST" ? `모든 기능을 이용하려면 로그인해 주세요.` : "오류가 있다고 생각되면 관리자에게 문의해 주세요.",
//       duration: 2,
//     });
//   }
//   return children;
// };


function App() {
  return (
    <Router>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />

        {/* <Route path="/mypage" element={
          <ProtectedRoute allowedRoles={['USER', "GUEST"]}>
            <Mypage />
          </ProtectedRoute>
        } /> */}




      </Routes>
      {/* </Suspense> */}
    </Router>
  );
}

export default App;