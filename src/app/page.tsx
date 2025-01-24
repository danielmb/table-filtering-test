import Link from 'next/link';

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">
          Welcome to my table demo
        </h1>
        <p className="text-lg text-center">
          This is a demo of a table with server-side filtering and pagination.
        </p>
        <Link href="/users" className="text-lg text-center">
          Go to the table
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

export const dynamic = 'force-dynamic';

//
