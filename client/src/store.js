import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      userId: null,
      setuserId: (userName) => set({ userId: userName }), // ← write to userId
    }),
    {
      name: "user-storage",
    }
  )
);

export default useStore;
