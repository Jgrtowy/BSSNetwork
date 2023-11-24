import { getServerAuthSession } from '~/server/auth';
import NewProfile from './components/NewProfile';

export default async function HomePage() {
    const session = await getServerAuthSession();
    if (session) {
        const exists = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${session.user.name}`)
            .then((res) => res.ok)
            .catch((e) => console.error(e));
        if (exists) return;
        // const { isOpen, onClose, onOpenChange } = useDisclosure();
        return <NewProfile />;
    }
    return <main className=""></main>;
}
