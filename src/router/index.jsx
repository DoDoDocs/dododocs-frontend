// /src/router/index.jsx
//TODO ProtectedRoute by role 
import React, { useEffect, Suspense, lazy } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';

import Home from './HomeRouter.jsx';
import Login from "./LoginRouter.jsx"
import OAuthCallback from "./OAuthCallbackRouter.jsx"
import Repo from "./RepoRouter.jsx"
import Landing from "./LandingRouter.jsx"

// 모달용 컴포넌트
import { RepoDetailContent } from "../components"
// 모달용 store import 추가
import { useAppModalStore } from '../store/store.js';

import Modal from 'react-modal';


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


// Modal의 루트 엘리먼트 설정
Modal.setAppElement('#root');


function App() {
  return (
    <Router>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/landing/:serviceTitle" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path='/callback/github' element={<OAuthCallback />} />
        <Route path="/repositories" element={<Repo />} >
          <Route
            path=":repoTitle"
            element={<RepoDetailContent />}
          />
        </Route>
        {/* <Route
          path="/repositories/:repoTitle"
          parentPath="/chatting"  // 모달이 닫힐 때 돌아갈 경로
          element={<RepoDetailContent />}
        /> */}

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