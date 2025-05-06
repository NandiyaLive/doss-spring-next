"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/reusable/data-table-column-header";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    title: "Product Count",
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Count" />
    ),
    cell: ({ row }) => {
      const products = row.getValue("products") || [];
      return <div>{products.length}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          disabled={row.getValue("products")?.length > 0}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
