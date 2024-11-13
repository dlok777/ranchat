import { create } from 'zustand'
import { loginCheck } from '@/utils/auth'

interface AuthState {
  isLogin: boolean
  setAuth: (status: boolean) => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  setAuth: (status: boolean) => set({ isLogin: status }),
  checkAuth: async () => {
    const status = await loginCheck();
    set({ isLogin: status });
  }
}))

export default useAuthStore;
