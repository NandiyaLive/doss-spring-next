import PageTitle from "@/components/dashboard/page-title";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./componanets/column";

export default function Page() {
  const data = [
    {
      id: 1001,
      user: {
        id: 501,
        name: "John Doe",
      },
      orderItems: [
        {
          id: 2001,
          product: {
            id: 1,
            name: "Classic White T-Shirt",
          },
          quantity: 2,
          price: 24.99,
        },
        {
          id: 2002,
          product: {
            id: 3,
            name: "Running Shoes",
          },
          quantity: 1,
          price: 89.99,
        },
      ],
      orderDate: "2023-05-15T10:30:00Z",
      totalAmount: 139.97,
      status: "DELIVERED",
      shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
    },
    {
      id: 1002,
      user: {
        id: 502,
        name: "Jane Smith",
      },
      orderItems: [
        {
          id: 2003,
          product: {
            id: 2,
            name: "Slim Fit Jeans",
          },
          quantity: 1,
          price: 59.99,
        },
      ],
      orderDate: "2023-06-20T14:15:00Z",
      totalAmount: 59.99,
      status: "PROCESSING",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    },
    {
      id: 1003,
      user: {
        id: 503,
        name: "Bob Johnson",
      },
      orderItems: [
        {
          id: 2004,
          product: {
            id: 1,
            name: "Classic White T-Shirt",
          },
          quantity: 3,
          price: 24.99,
        },
        {
          id: 2005,
          product: {
            id: 2,
            name: "Slim Fit Jeans",
          },
          quantity: 2,
          price: 59.99,
        },
      ],
      orderDate: "2023-07-10T09:45:00Z",
      totalAmount: 174.95,
      status: "SHIPPED",
      shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    },
  ];
  return (
    <main>
      <section className="container">
        <PageTitle title="Orders" subtitle="Manage your orders" />

        <DataTable columns={columns} data={data} keyword="customer" />
      </section>
    </main>
  );
}
