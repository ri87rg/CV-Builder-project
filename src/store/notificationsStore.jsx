import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (message, showPreview, path) => set((state) => ({
    notifications: [...state.notifications, { 
      id: Date.now(), 
      title: message.title, 
      description: message.description, 
      showPreview: showPreview, 
      path: path 
    }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(notification => notification.id !== id)
  }))
}))