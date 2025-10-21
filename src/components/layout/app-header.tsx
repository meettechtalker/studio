import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 md:justify-end">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden group-data-[state=expanded]:md:hidden">
        <UserNav />
      </div>
    </header>
  );
}
