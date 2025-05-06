"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/reusable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import CategoryDialog from "./category-dialog";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => {
      const products = row.getValue("products");
      const count = products.length;

      return (
        <Badge variant="secondary" className="font-medium">
          {count} {count === 1 ? "product" : "products"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          <CategoryDialog category={category} />

          <Button variant="destructive" disabled={category.products.length > 0}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
