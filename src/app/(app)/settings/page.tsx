'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { useUser, useAuth, useFirestore } from "@/firebase/provider";
import { signInWithGoogle } from "@/firebase/auth";
import { syncLocalDataToFirestore } from "@/context/data-sync";
import { saveUserProfile } from '@/firebase/user-service';
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useIsMobile } from "@/hooks/use-mobile";

export default function SettingsPage() {
  const { currency, setCurrency } = useSettings();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  const [storagePreference, setStoragePreference] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const pref = localStorage.getItem('storagePreference');
    setStoragePreference(pref);
  }, [user]);

  const handleSignInAndSync = async () => {
    setIsSyncing(true);
    try {
      // Step 1: Authenticate user
      const newUser = await signInWithGoogle(auth);
      
      // Step 2: Save user profile to Firestore
      await saveUserProfile(firestore, newUser);

      localStorage.setItem('storagePreference', 'firebase');
      setStoragePreference('firebase');

      // Step 3: Sync local data if it exists
      const localTransactionsRaw = localStorage.getItem('transactions');
      if (localTransactionsRaw) {
        toast({ title: "Syncing local data...", description: "Please wait while we sync your existing data." });
        await syncLocalDataToFirestore(firestore, newUser.uid);
      }
      
      toast({ title: "Sign-in successful!", description: "Your data is now synced with the cloud." });
      
      // NOTE: Removed router.refresh(). The context now handles the data refresh.

    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user' && error.message !== 'You cancelled the sign-in process.') {
        console.error("Sign-in process failed:", error);
        toast({
          variant: "destructive",
          title: "Sign-in failed",
          description: error.message || "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsSyncing(false);
    }
  };
  
  const isCloudSync = storagePreference === 'firebase' && !!user;
  const showSyncPrompt = !user && storagePreference === 'local';

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">
        Manage your app preferences and settings.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="theme-mode">Theme Mode</Label>
              <p className="text-sm text-muted-foreground">
                Choose between light or dark theme.
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <p className="text-sm text-muted-foreground">
                Select your preferred currency for display.
              </p>
            </div>
            <CurrencyCombobox
              value={currency}
              onSelect={setCurrency}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Data & Sync</CardTitle>
          <CardDescription>
            Manage how your data is stored and synchronized.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="cloud-sync">Cloud Sync</Label>
              <p className="text-sm text-muted-foreground">
                {isCloudSync ? "Your data is securely synced with Firebase." : "Enable to back up and sync your data with Firebase."}
              </p>
            </div>
            <Switch id="cloud-sync" checked={isCloudSync} disabled aria-readonly />
          </div>
          {showSyncPrompt && (
             <div className="flex items-center justify-between rounded-lg border-primary/20 border bg-primary/5 p-4">
              <div>
                <Label htmlFor="cloud-sync-prompt">Switch to Cloud</Label>
                <p className="text-sm text-muted-foreground">
                  Sign in with Google to sync your local data to the cloud.
                </p>
              </div>
               {isSyncing ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isMobile ? 'Syncing...' : 'Signing In...'}
                </Button>
              ) : (
                <Button onClick={handleSignInAndSync}>
                  {isMobile ? 'Sync' : 'Sign In & Sync'}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
