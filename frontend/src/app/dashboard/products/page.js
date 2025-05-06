"use client";

import PageTitle from "@/components/dashboard/page-title";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./componanets/column";
import ProductDialog from "./componanets/product-dialog";

export default function Page() {
  const data = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      description: "Premium quality cotton t-shirt for everyday wear",
      price: 24.99,
      stockQuantity: 150,
      size: "M",
      color: "#FFFFFF",
      category: {
        id: 1,
        name: "T-Shirts",
      },
      imageUrl: "/images/products/tshirt-white.jpg",
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      description: "Stretch denim jeans with modern slim fit",
      price: 59.99,
      stockQuantity: 75,
      size: "32",
      color: "#0000FF",
      category: {
        id: 2,
        name: "Pants",
      },
      imageUrl: "/images/products/jeans-blue.jpg",
    },
    {
      id: 3,
      name: "Running Shoes",
      description: "Lightweight running shoes with cushioned soles",
      price: 89.99,
      stockQuantity: 40,
      size: "10",
      color: "#FF0000",
      category: {
        id: 3,
        name: "Footwear",
      },
      imageUrl: "/images/products/shoes-red.jpg",
    },
  ];

  return (
    <main>
      <section className="container">
        <PageTitle title="Products" subtitle="Manage your products">
          <ProductDialog />
        </PageTitle>

        <DataTable columns={columns} data={data} keyword="name" />
      </section>
    </main>
  );
}
