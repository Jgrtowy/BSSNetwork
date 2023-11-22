export default async function Page({ params }: { params: { name: string } }) {
    const req = (await fetch(`${process.env.NEXTAUTH_URL}/api/users/${params.name}`)
        .then((res) => res.json())
        .catch((e) => console.error(e))) as PublicProfile;

    return <div>My Post: {req.displayName}</div>;
}
