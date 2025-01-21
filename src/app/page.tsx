import { parseFiltersAsFilter } from '@/components/table/parser';
import { getUsersSchema } from '@/components/user-table/get-users-schema';
import UsersRootTable from '@/components/user-table/root-table';

interface HomeProps {
  searchParams: Promise<Record<string, string>>;
}
export default async function Home({
  searchParams: searchParamsAsync,
}: HomeProps) {
  const searchParams = await searchParamsAsync;
  // const filters = filterFieldstoFilters(
  //   searchParams.filters ? JSON.parse(searchParams.filters) : [],
  // );
  // const filters = searchParamsToFilters(searchParams);
  const filters = parseFiltersAsFilter(getUsersSchema)
    .withDefault([])
    .parseServerSide(searchParams.filters);
  console.log(filters);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <UsersRootTable filters={filters} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

export const dynamic = 'force-dynamic';
