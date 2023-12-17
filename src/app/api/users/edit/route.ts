import { type NextRequest } from 'next/server';
import { getServerAuthSession } from '~/server/auth';
import { db } from '~/server/db';

export async function POST(req: NextRequest) {
    const session = await getServerAuthSession();
    if (!session) {
        return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
    }
    if (!req.json) {
        return new Response(JSON.stringify({ error: 'No body' }), { status: 400 });
    }

    const data = (await req.json()) as unknown as PublicProfile;
    console.log(session.user.id);

    try {
        const profile = await db.profile.findFirst({
            where: {
                AND: [
                    {
                        displayName: {
                            equals: data.displayName,
                            mode: 'insensitive',
                        },
                    },
                    {
                        userId: {
                            not: session.user.id,
                        },
                    },
                ],
            },
        });
        if (profile) {
            return new Response(JSON.stringify({ error: 'Username already taken' }), { status: 400 });
        }
        await db.profile.update({
            where: {
                userId: session.user.id,
            },
            data: {
                displayName: data.displayName,
                ign: data.ign,
            },
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
