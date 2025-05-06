"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/reusable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import OrderDialog from "./order-dialog";

export const columns = [
  {
    id: "customer",
    title: "Customer",
    accessorKey: "user.name",
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
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center gap-2">
          <OrderDialog order={order} />
          <Button
            variant="destructive"
            disabled={["SHIPPED", "DELIVERED"].includes(order.status)}
          >
            Cancel
          </Button>
        </div>
      );
    },
  },
];
