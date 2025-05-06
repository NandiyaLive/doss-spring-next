import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters" })
    .max(50, { message: "Category name must be less than 50 characters" })
    .refine((val) => !val.trim().includes("  "), {
      message: "Category name cannot contain consecutive spaces",
    }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters" })
    .max(50, { message: "Slug must be less than 50 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
});

const CategoryDialog = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(!category?.slug);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
    },
  });

  const watchName = form.watch("name");

  useEffect(() => {
    if (autoGenerateSlug && watchName) {
      form.setValue("slug", generateSlug(watchName), { shouldValidate: true });
    }
  }, [watchName, autoGenerateSlug, form]);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);

    const productCount = category?.products?.length || 0;
    console.log(`This category has ${productCount} products`);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={category ? "outline" : "default"}>
          {category ? "Edit" : "Add Category"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? `Edit category information. This category has ${category.products.length} products.`
              : "Create a new product category for your store."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed to customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Slug</FormLabel>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto-generate"
                        checked={autoGenerateSlug}
                        onChange={() => setAutoGenerateSlug(!autoGenerateSlug)}
                        className="mr-1"
                      />
                      <Label
                        htmlFor="auto-generate"
                        className="text-xs cursor-pointer"
                      >
                        Auto-generate
                      </Label>
                    </div>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="category-slug"
                      {...field}
                      disabled={autoGenerateSlug}
                    />
                  </FormControl>
                  <FormDescription>
                    Used in URLs (e.g., yourstore.com/categories/category-slug)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {category && (
              <div className="text-sm text-muted-foreground">
                This category contains {category.products.length} products.
                {category.products.length > 0 && (
                  <p className="mt-1 text-xs">
                    Note: Changing a category name will affect all associated
                    products.
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button type="submit">
                {category ? "Save Changes" : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
