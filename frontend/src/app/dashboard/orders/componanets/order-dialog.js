"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ORDER_STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

const orderStatusSchema = z.object({
  status: z.enum(
    ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
    {
      required_error: "Please select an order status.",
    },
  ),
});

const OrderDialog = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status: order?.status || "PENDING",
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadgeVariant = (status) => {
    return (
      {
        PENDING: "secondary",
        PROCESSING: "info",
        SHIPPED: "warning",
        DELIVERED: "success",
        CANCELLED: "destructive",
      }[status] || "default"
    );
  };

  const onSubmit = (data) => {
    console.log(`Updating order #${order.id} status to: ${data.status}`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        View
      </Button>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Order #{order.id}
            <Badge variant={getStatusBadgeVariant(order.status)}>
              {order.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Placed on {formatDate(order.orderDate)} by {order.user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Order Status Update Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {ORDER_STATUSES.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4">
                <Button type="submit">Update Status</Button>
              </div>
            </form>
          </Form>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium mb-2">Customer Information</h3>
            <p>
              <strong>Customer ID:</strong> {order.user.id}
            </p>
            <p>
              <strong>Name:</strong> {order.user.name}
            </p>
          </div>

          <Separator />

          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
            <p className="whitespace-pre-line">{order.shippingAddress}</p>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-medium mb-3">Order Items</h3>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start p-3 border rounded-md"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatCurrency(item.quantity * item.price)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4 flex justify-between items-center">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-lg">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
