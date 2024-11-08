import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuthStore } from '../store/authStore';
import { userAPI } from '../api/index.js';

// 사용자 데이터 관리를 위한 hook
// ReactQuery를 사용하여 서버 상태 관리
export function useUser() {
  // React Query의 클라이언트 인스턴스에 접근
  const queryClient = useQueryClient();

  const { token, user } = useAuthStore();

  // 사용자 프로필 데이터 조회
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => userAPI.getProfile(user.id),
    enabled: !!user, // 사용자 정보가 있을 때만 API 조회
  });

  // 프로필 업데이트를 위한 뮤테이션
  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    // 성공 시 프로필 데이터 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries(['user', 'profile']);
    },
  });

  return {
    profile: userProfile,
    isLoading,
    updateProfile: updateProfileMutation.mutate,
  };
}
