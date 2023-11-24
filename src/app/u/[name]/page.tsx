export default async function Page({ params }: { params: { name: string } }) {
    const req = (await fetch(`${process.env.NEXTAUTH_URL}/api/users/${params.name}`)
        .then((res) => (res.ok ? res.json() : null))
        .catch((e) => console.error(e))) as PublicProfile;
    return (
        <>
            {req ? (
                <div>
                    <h1>{req.displayName}</h1>
                </div>
            ) : (
                <div>
                    <h1>User not found</h1>
                </div>
            )}
        </>
    );
}
