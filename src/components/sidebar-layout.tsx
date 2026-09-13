'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Settings,
  AreaChart,
  LogOut,
  Wallet,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LazyAddTransactionDialog } from './dashboard/lazy-add-transaction-dialog';
import { useUser } from '@/firebase/provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';
import { SpendyLogo } from './ui/spendy-logo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/transactions', label: 'Transactions', icon: Wallet },
  { href: '/statistics', label: 'Statistics', icon: AreaChart },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

function NavLink({ href, label, icon: Icon }: NavLinkProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <Link href={href} prefetch={true}>
        <SidebarMenuButton
          isActive={pathname === href}
          tooltip={label}
          onClick={() => setOpenMobile(false)}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { setOpenMobile } = useSidebar();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isLocalUser = isClient && localStorage.getItem('storagePreference') === 'local' && !user;

  const userImage = isLocalUser ? null : user?.photoURL;
  const userName = user?.displayName || 'User';
  const userEmail = user?.email || (isLocalUser ? 'user@spendy.com' : undefined);

  const handleSignOut = async () => {
    try {
      const { auth } = initializeFirebase();
      await signOut(auth);
      localStorage.removeItem('storagePreference');
      router.push('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Close sidebar on route change
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" prefetch={true} className="flex items-center gap-2">
                <SpendyLogo className="h-10 w-10" />
                <h2 className="font-headline text-xl font-semibold tracking-tight">
                  Spendy
                </h2>
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          {/* Footer content can be placed here if needed in the future */}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <div className="hidden md:block">
              <h1 className="font-headline text-xl font-bold tracking-tight">
                {navItems.find((item) => item.href === pathname)?.label || 'Spendy'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <LazyAddTransactionDialog />
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    {userImage && <AvatarImage src={userImage} alt="User Avatar" />}
                    <AvatarFallback>
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    {userEmail && <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>}
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                
                {!isUserLoading && user && (
                  <DropdownMenuItem onSelect={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                )}
                
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
