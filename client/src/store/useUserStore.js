import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (userData) => set({ user: userData, loading: false }),
  clearUser: () => set({ user: null, loading: false }),
  setLoading: (loading) => set({ loading }),
}));

export default useUserStore;
