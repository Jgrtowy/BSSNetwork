import { NextResponse, type NextRequest } from 'next/server';
import { db } from '~/server/db';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    const { name } = params;

    if (!name) {
        return new NextResponse(JSON.stringify({ error: 'No name provided' }), { status: 400 });
    }

    const profile = await db.profile.findUnique({
        where: {
            displayName: name,
        },
    });

    if (!profile) {
        return new NextResponse(JSON.stringify({ error: 'Profile not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(profile), { status: 200 });
}
