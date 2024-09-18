import { Suspense } from 'react';
import { getQuote } from "@/actions/quotes/quotes-actions";
import QuotePage from '@/components/clientSpace/quote/QuotePage';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

async function getUser(userId: string) {
  const res = await fetch(`https://api.nevtis.com/user/users/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

async function QuoteData({ id }: { id: string }) {
  const { quote } = await getQuote(id);
  if (!quote) notFound();

  let user = null;
  if (quote.user) {
    user = await getUser(quote.user);
  }

  return <QuotePage data={quote} id={id} seller={user} />;
}

export default function QuotePageC({ params }: Props) {
  return (
    <div className='w-full h-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <QuoteData id={params.id} />
      </Suspense>
    </div>
  );
}