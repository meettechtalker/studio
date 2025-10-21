"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function GoogleSignInButton() {
  return (
    <Link href="/home" passHref>
      <Button size="lg" className="gap-2 bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-shadow">
        <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.4 69.4c-22.3-21.5-53.5-34.4-90.1-34.4-70.5 0-129.2 57.8-129.2 129.2s58.7 129.2 129.2 129.2c81.2 0 116.3-53.5 120.7-78.7H248V261.8h239.2c.8 12.6 1.6 25.7 1.6 39.4z"></path>
        </svg>
        Sign in with Google
      </Button>
    </Link>
  );
}
