'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Logo } from './logo';
import { Home, Compass, PlusSquare, User, LogOut } from 'lucide-react';
import { UserNav } from './user-nav';

const menuItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/create', label: 'Create Post', icon: PlusSquare },
  { href: '/profile/you', label: 'Profile', icon: User },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <div className="hidden group-data-[state=collapsed]:block">
          <UserNav />
         </div>
         <div className="hidden group-data-[state=expanded]:block">
           <SidebarMenuButton asChild>
              <Link href="/">
                  <LogOut />
                  <span>Logout</span>
              </Link>
           </SidebarMenuButton>
         </div>
      </SidebarFooter>
    </>
  );
}
