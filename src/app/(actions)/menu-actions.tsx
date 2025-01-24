'use server';

import { cookies } from 'next/headers';

export async function toggleMobileMenu() {
  const cookieStore = await cookies();
  const currentState = cookieStore.get('mobileMenuOpen');

  if (currentState && currentState.value === 'true') {
    cookieStore.set('mobileMenuOpen', 'false');
  } else {
    cookieStore.set('mobileMenuOpen', 'true');
  }
}

export async function getMobileMenuState() {
  const cookieStore = await cookies();
  const state = cookieStore.get('mobileMenuOpen');
  return state && state.value === 'true';
}
