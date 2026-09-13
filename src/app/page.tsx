'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud, HardDrive, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUser, useAuth, useFirestore } from '@/firebase/provider';
import { signInWithGoogle } from '@/firebase/auth';
import { syncLocalDataToFirestore } from '@/context/data-sync';
import { saveUserProfile } from '@/firebase/user-service';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/theme-toggle';
import { useToast } from '@/hooks/use-toast';
import { SpendyLogo } from '@/components/ui/spendy-logo';

function LandingPageContent() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [isNavigating, setIsNavigating] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading) {
      const storagePref = localStorage.getItem('storagePreference');
      if (user && (storagePref === 'firebase' || storagePref === null)) {
        router.push('/dashboard');
      } else if (storagePref === 'local' && !user) {
         router.push('/dashboard');
      } else {
        setIsNavigating(false);
      }
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    setIsProcessing(true);
    const { id: toastId, dismiss, update } = toast({
      title: "Please wait...",
      description: "Signing you in with Google.",
    });

    try {
      // Step 1: Authenticate user.
      const newUser = await signInWithGoogle(auth);
      
      // Step 2: Save user profile. This is now NON-BLOCKING.
      saveUserProfile(firestore, newUser);

      localStorage.setItem('storagePreference', 'firebase');
      
      // Step 3: Sync local data if it exists.
      const localTransactionsRaw = localStorage.getItem('transactions');
      if (localTransactionsRaw) {
        update({ id: toastId, title: "Syncing data...", description: "Please wait..." });
        await syncLocalDataToFirestore(firestore, newUser.uid);
        update({ id: toastId, title: "Data synced!", description: "Your local data is now in the cloud." });
      } else {
        update({ id: toastId, title: "Sign-in successful!", description: "Welcome to Spendy!" });
      }

      // Step 4: Navigate to dashboard.
      router.push('/dashboard');

    } catch (error: any) {
       if (error.code === 'auth/popup-closed-by-user' || error.message === 'You cancelled the sign-in process.') {
         update({
          id: toastId,
          variant: "default",
          title: "Sign-in cancelled",
          description: "You can sign in anytime to sync your data.",
        });
       } else {
        console.error("Sign-in process failed:", error);
        update({
          id: toastId,
          variant: "destructive",
          title: "Sign-in failed",
          description: error.message || "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
        setIsProcessing(false);
        setTimeout(() => dismiss(), 3000);
    }
  };

  const handleLocalSignIn = () => {
    if (isProcessing) return;
    localStorage.setItem('storagePreference', 'local');
    router.push('/dashboard');
  }

  if (isNavigating || isUserLoading) {
    return (
      <div className="flex flex-col min-h-screen">
          <header className="flex h-14 items-center justify-end px-4 lg:px-6">
              <Skeleton className="h-9 w-9 rounded-full" />
          </header>
          <main className="flex-1 flex items-center justify-center bg-background">
              <div className="container mx-auto flex flex-col items-center justify-center space-y-8 px-4 text-center">
                  <div className="flex items-center gap-2">
                      <Skeleton className="h-12 w-12" />
                      <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                          Spendy
                      </h1>
                  </div>
                  <Skeleton className="h-8 w-1/2" />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full max-w-4xl">
                      <Card>
                          <CardHeader className="items-center">
                              <Skeleton className="h-12 w-12 rounded-full" />
                          </CardHeader>
                          <CardContent className="text-center space-y-2">
                              <Skeleton className="h-6 w-3/4 mx-auto" />
                              <Skeleton className="h-4 w-full mx-auto" />
                          </CardContent>
                      </Card>
                      <Card>
                          <CardHeader className="items-center">
                              <Skeleton className="h-12 w-12 rounded-full" />
                          </CardHeader>
                          <CardContent className="text-center space-y-2">
                              <Skeleton className="h-6 w-3/4 mx-auto" />
                              <Skeleton className="h-4 w-full mx-auto" />
                          </CardContent>
                      </Card>
                  </div>
              </div>
          </main>
    </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
       <header className="flex h-14 items-center justify-end px-4 lg:px-6">
          <ThemeToggle />
        </header>
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8 px-4 text-center">
            <div className="flex items-center gap-2">
                <SpendyLogo className="h-16 w-16 text-primary" />
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Spendy
                </h1>
            </div>

            <div className='w-full max-w-4xl text-center space-y-8'>
                <p className="max-w-[700px] mx-auto text-lg text-muted-foreground sm:text-xl">
                    Take control of your finances with Spendy, the smart, offline-first tracker for your income and expenses. Effortlessly monitor your spending, visualize your financial habits, and sync seamlessly with the cloud whenever you choose.
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Card
                        className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
                        onClick={!isProcessing ? handleGoogleSignIn : undefined}
                    >
                        <CardHeader className="items-center">
                            {isProcessing ? <Loader2 className="h-12 w-12 animate-spin text-primary" /> : <Cloud className="h-12 w-12 text-primary" />}
                        </CardHeader>
                        <CardContent className="text-center">
                            <CardTitle className="font-headline text-xl">Sync with Google</CardTitle>
                            <CardDescription>
                            Securely save and sync your data with one click.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleLocalSignIn}
                    >
                        <CardHeader className="items-center">
                             <HardDrive className="h-12 w-12 text-primary" />
                        </CardHeader>
                        <CardContent className="text-center">
                            <CardTitle className="font-headline text-xl">Use Local Storage</CardTitle>
                            <CardDescription>
                            Full offline usage, stored only on this device.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
      <LandingPageContent />
    </Suspense>
  )
}
