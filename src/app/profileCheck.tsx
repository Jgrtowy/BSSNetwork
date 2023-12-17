'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NewProfile from './components/NewProfile';

export default function ProfileCheck() {
    const { status } = useSession();
    const [exists, setExists] = useState<boolean>(true);
    useEffect(() => {
        const get = async () => {
            if (status === 'unauthenticated') return;
            await fetch(`/api/users/getcurrent`).then((res) => (res.status === 202 ? setExists(false) : setExists(true)));
        };
        get().catch((e) => console.error(e));
    }, []);
    return <>{exists ? <></> : <NewProfile />}</>;
}
