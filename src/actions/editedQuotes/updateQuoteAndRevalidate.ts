'use server'

import { revalidatePath } from 'next/cache'
import { updateQuote } from '@/actions/quotes/quotes-actions'

export async function updateQuoteAndRevalidate(id: string, data: any) {
  const updated = await updateQuote(id, data)
  console.log(`/dashboard/editQuote/company/${id}`)
  revalidatePath(`/dashboard/editQuote/company/${id}`);
  revalidatePath(`/dashboard/editQuote/user/${id}`);
  revalidatePath(`/dashboard/editQuote/portNumbers/${id}`);
  revalidatePath(`/dashboard/editQuote/market/${id}`);
  revalidatePath(`/dashboard/editQuote/entries/${id}`);
  revalidatePath(`/dashboard/editQuote/cart/${id}`);
  return updated
}