"use client";

import PageTitle from "@/components/dashboard/page-title";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./componanets/column";
import CategoryDialog from "./componanets/category-dialog";

export default function Page() {
  const data = [
    {
      id: 1,
      name: "T-Shirts",
      products: [{ id: 1 }, { id: 4 }, { id: 7 }],
    },
    {
      id: 2,
      name: "Pants",
      products: [{ id: 2 }, { id: 5 }],
    },
    {
      id: 3,
      name: "Footwear",
      products: [{ id: 3 }, { id: 6 }, { id: 8 }, { id: 9 }],
    },
  ];

  return (
    <main>
      <section className="container">
        <PageTitle title="Categories" subtitle="Manage your product categories">
          <CategoryDialog />
        </PageTitle>

        <DataTable columns={columns} data={data} keyword="name" />
      </section>
    </main>
  );
}
