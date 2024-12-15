import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {
  isAppModalOpen: false, // 모달 열림 상태
  AppRepo: null, // 열릴 repo 이름
};

const useAppModalStore = create(
  devtools(
    (set, get) => ({
      ...initialState,

      setAppRepo: (repo) => set({ AppRepo: repo }), // 선택된 repo 설정
      setOpenAppModal: () => {
        const AppRepo = get().AppRepo;
        if (!AppRepo) return;
        set({ isAppModalOpen: true }); // Redux DevTools에서도 상태를 볼 수 있음
      }, // 모달 열기
      setCloseAppModal: () => set({ isAppModalOpen: false, AppRepo: null }), // 모달 닫기
      reset: () => set(initialState, false, 'resetAppModalState'), // false는 state 교체, 'reset'은 액션 이름
    }),
    {
      name: 'AppModalStore',
      enabled: process.env.NODE_ENV === 'development', // 개발 환경에서만 활성화
    },
  ), // Redux DevTools에서 표시될 스토어 이름
);

export default useAppModalStore;
