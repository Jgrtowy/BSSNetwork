import { type NextRequest } from 'next/server';
import { getServerAuthSession } from '~/server/auth';
import { db } from '~/server/db';

export async function POST(req: NextRequest) {
    const session = await getServerAuthSession();

    if (!session) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const csrfToken = req.headers.get('x-csrf-token');

    if (!csrfToken) {
        return new Response(JSON.stringify({ error: 'No CSRF token provided' }), { status: 400 });
    }
    if (csrfToken !== req.cookies.get('csrfToken')?.value) {
        return new Response(JSON.stringify({ error: 'Invalid CSRF token' }), { status: 403 });
    }

    const { displayName } = req.body as unknown as { displayName: string };

    await db.profile.create({
        data: {
            displayName,
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    });
}
