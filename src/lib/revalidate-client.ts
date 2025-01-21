'use server';

import { revalidatePath } from 'next/cache';

// allows revalidation of the cache on the client side

export const revalidatePathClient = async (path: string) => {
  revalidatePath(path);
};
