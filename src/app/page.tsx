import { GoogleSignInButton } from '@/components/auth/google-signin-button';
import { Logo } from '@/components/layout/logo';

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4">
        <Logo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
          Welcome to PreferencePulse
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Share what you love, and what you don't. Connect with people who have similar tastes and discover your next favorite thing.
        </p>
        <div className="mt-8">
          <GoogleSignInButton />
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PreferencePulse. All rights reserved.
      </footer>
    </div>
  );
}
