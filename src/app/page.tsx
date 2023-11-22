import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    if (session) {
        const exists = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${session.user.name}`).then((res) => res.ok);
        if (exists) return;

        // const req = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${session.user.name}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(session.user),
        // }).then((res) => res.json());
    }
    return <main className=""></main>;
}
