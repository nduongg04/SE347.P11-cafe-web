import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const categoryFormSchema = z.object({
  categoryName: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  image: z
    .string()
    .url({
      message: "Please enter a valid URL for the category image.",
    })
    .or(z.literal("")),
});

export default function CategoryForm({
  category,
  onSubmit,
  onCancel,
}: {
  category?: Category;
  onSubmit: (category: Partial<Category>) => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryName: category?.categoryName || "",
      image: category?.image || "",
    },
  });

  function onSubmitForm(values: z.infer<typeof categoryFormSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <ImageUploader
                  image={field.value}
                  onImageUpload={(url) => field.onChange(url)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
