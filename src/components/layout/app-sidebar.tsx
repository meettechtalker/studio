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
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <div className="hidden group-data-[state=collapsed]:block">
          <UserNav />
         </div>
         <div className="hidden group-data-[state=expanded]:block">
            <Link href="/">
                <SidebarMenuButton>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </Link>
         </div>
      </SidebarFooter>
    </>
  );
}
