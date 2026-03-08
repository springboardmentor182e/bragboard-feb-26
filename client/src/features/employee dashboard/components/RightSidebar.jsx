import NotificationsPanel from './NotificationsPanel';
import RecentActivityPanel from './RecentActivityPanel';
import PlatformUpdateCard from './PlatformUpdateCard';

export default function RightSidebar() {
  return (
    <>
      <NotificationsPanel />
      <RecentActivityPanel />
      <PlatformUpdateCard />
    </>
  );
}
