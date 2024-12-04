import { create } from 'zustand';

const useAppModalStore = create((set, get) => ({
  isAppModalOpen: false, // 모달 열림 상태
  AppRepo: null, // 열릴 repo 이름
  setAppRepo: (repo) => set({ repo }), // 선택된 repo  설정
  setOpenAppModal: () => {
    const AppRepo = get().AppRepo;
    if (!AppRepo) return;
    set({ isModalOpen: true });
  }, // 모달 열기
  setCloseAppModal: () => set({ isModalOpen: false, AppRepo: null }), // 모달 닫기
}));

export default useAppModalStore;
