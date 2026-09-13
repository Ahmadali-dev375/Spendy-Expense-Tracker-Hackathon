import { SidebarLayout } from '@/components/sidebar-layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SettingsProvider } from '@/context/settings-context';
import { TransactionProvider } from '@/context/transaction-context';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SettingsProvider>
        <TransactionProvider>
          <SidebarLayout>{children}</SidebarLayout>
        </TransactionProvider>
      </SettingsProvider>
    </SidebarProvider>
  );
}
