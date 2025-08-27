import { useNotificationStore } from '../store/notificationsStore'
import Notification from './notification'

export default function NotificationsContainer() {
  const { notifications, removeNotification } = useNotificationStore()

  return (
    <div className='Notification-container absolute w-full pointer-events-none'>
      <div className="flex items-end flex-col-reverse h-[100vh]">
        {notifications.map((notificationProperties) => (
          <Notification 
            key={notificationProperties.id} 
            title={notificationProperties.title} 
            description={notificationProperties.description} 
            showPreview={notificationProperties.showPreview} 
            path={notificationProperties.path}
            onClose={() => removeNotification(notificationProperties.id)}
          />
        ))}
      </div>
    </div>
  )
}