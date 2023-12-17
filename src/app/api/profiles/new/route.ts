import { NextResponse, type NextRequest } from 'next/server';
import { getServerAuthSession } from '~/server/auth';
import { db } from '~/server/db';

export async function POST(req: NextRequest) {
    const session = await getServerAuthSession();

    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const data = (await req.json()) as { body: { username: string; image: string } };
    try {
        const profile = await db.profile.findFirst({
            where: {
                displayName: {
                    equals: data.body.username,
                    mode: 'insensitive',
                },
            },
        });
        if (profile) {
            return new NextResponse(JSON.stringify({ error: 'Profile already exists' }), { status: 400 });
        }
        await db.profile.create({
            data: {
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
                displayName: data.body.username,
                image: session.user?.image,
            },
        });
        return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}
