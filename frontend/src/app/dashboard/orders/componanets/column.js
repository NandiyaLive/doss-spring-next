"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/reusable/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    id: "customer",
    title: "Customer",
    accessorKey: "user.username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  },
  {
    title: "Order Date",
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("orderDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    title: "Total",
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant =
        {
          PENDING: "secondary",
          PROCESSING: "info",
          SHIPPED: "warning",
          DELIVERED: "success",
          CANCELLED: "destructive",
        }[status] || "default";

      return <Badge variant={variant}>{status}</Badge>;
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
          View Details
        </Button>
        <Button
          variant="destructive"
          size="sm"
          disabled={["SHIPPED", "DELIVERED"].includes(row.getValue("status"))}
        >
          Cancel
        </Button>
      </div>
    ),
  },
];
