import { NextResponse } from 'next/server';
import { getServerAuthSession } from '~/server/auth';
import { db } from '~/server/db';

export async function GET() {
    const session = await getServerAuthSession();
    if (!session) {
        return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
    }

    const { id } = session as unknown as { id: string };
    try {
        const profile = await db.profile.findFirst({
            where: {
                id: {
                    equals: id,
                },
            },
            select: {
                displayName: true,
                image: true,
                ign: true,
            },
        });
        if (!profile) {
            return new NextResponse(JSON.stringify({ error: 'Profile does not exist' }), { status: 202 });
        }

        return new NextResponse(JSON.stringify({ profile }), { status: 200 });
    } catch (e) {
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
