'use client';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <SessionProvider>{children}</SessionProvider>
        </NextUIProvider>
    );
}
