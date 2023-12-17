import { Avatar, Chip } from '@nextui-org/react';

export default async function Page({ params }: { params: { name: string } }) {
    const req = (await fetch(`${process.env.NEXTAUTH_URL}/api/profiles/${params.name}`).then((res) => (res.ok ? res.json() : null))) as { displayName: string; image: string; badges: { name: string; description: string; color: string }[] };

    return (
        <>
            {req ? (
                <div className="w-screen flex flex-col my-2 items-center justify-center">
                    <div className="flex gap-2 border-2 px-5 py-5 rounded-lg">
                        <Avatar src={req.image} size="lg" className="w-24 h-24" isBordered radius="sm" color={req.badges[0]?.name == 'Dev' ? 'warning' : req.badges[0]?.name == 'Admin' ? 'danger' : 'default'} alt={'Profile picture'} />
                        <div className="flex flex-col items-start justify-end">
                            <span></span>
                            <div className="flex gap-2 items-end">
                                <h1 className="text-3xl font-bold">{req.displayName}</h1>
                                {req.badges.length > 0 &&
                                    req.badges.map((badge) => {
                                        const classes = `border-sm ${badge.color}`;

                                        return (
                                            <>
                                                <Chip key={badge.name} classNames={{ base: classes }} variant="bordered">
                                                    {badge.name}
                                                </Chip>
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-screen flex flex-col items-center justify-center my-2 text-5xl">
                    <h1>User not found 👀</h1>
                </div>
            )}
        </>
    );
}
