import { create } from "zustand"

export const useCVStore = create((set) => ({
  CVs: [],
  addCV: (info) => set((state) => ({
    CVs: [...state.CVs, info]
  })),
  removeCV: (id) => set((state) => ({
    CVs: state.CVs.filter(CV => CV.id !== id)
  })),
  updateCV: (newInfo) => set((state) => ({
    CVs: state.CVs.map((cv) => 
      cv.id === newInfo.id ? (
        {...cv, ...newInfo}
      ) : (
        cv
      )
    )
  }))
}))