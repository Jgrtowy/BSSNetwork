import { NextResponse, type NextRequest } from 'next/server';
import { db } from '~/server/db';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;

    if (!username) {
        return new NextResponse(JSON.stringify({ error: 'No username provided' }), { status: 400 });
    }

    const profile = await db.profile.findFirst({
        where: {
            displayName: {
                equals: username,
                mode: 'insensitive',
            },
        },
        select: {
            displayName: true,
            image: true,
            badges: true,
        },
    });

    if (!profile) {
        return new NextResponse(JSON.stringify({ error: 'Profile not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(profile), { status: 200 });
}
