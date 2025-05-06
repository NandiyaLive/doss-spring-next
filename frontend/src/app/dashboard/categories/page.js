import PageTitle from "@/components/dashboard/page-title";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./componanets/column";

export default function Page() {
  return (
    <main>
      <section className="container">
        <PageTitle
          title="Categories"
          subtitle="Manage your product categories"
        />

        <DataTable columns={columns} data={{}} keyword="name" />
      </section>
    </main>
  );
}
