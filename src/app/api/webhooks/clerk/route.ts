import { WebhookEvent } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
export const POST = async (req: NextRequest) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret)
    return NextResponse.json(
      { error: 'The server is not configured with a webhook secret' },
      { status: 500 },
    );

  const signature = req.headers.get('clerk-webhook-signature');
  if (!signature)
    return NextResponse.json(
      { error: 'No webhook signature provided' },
      { status: 400 },
    );

  if (signature !== secret)
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 },
    );

  const evt = (await req.json()) as WebhookEvent;
  const { id: clerkUserId } = evt.data;
  if (!clerkUserId)
    return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });

  let user = null;
  switch (evt.type) {
    case 'user.created': {
      user = await prisma.userData.upsert({
        where: {
          clerkUserId,
        },
        update: {
          clerkUserId,
        },
        create: {
          clerkUserId,
        },
      });
      break;
    }
    case 'user.deleted': {
      user = await prisma.userData.delete({
        where: {
          clerkUserId,
        },
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ user });
};
