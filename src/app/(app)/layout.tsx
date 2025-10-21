import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail, SidebarContent } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <AppSidebar />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1">
            <AppHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <SidebarInset>
                    {children}
                </SidebarInset>
            </main>
        </div>
        <SidebarRail />
    </SidebarProvider>
  );
}
