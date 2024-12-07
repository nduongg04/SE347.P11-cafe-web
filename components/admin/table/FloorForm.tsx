import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { table } from "console";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const floorFormSchema = z.object({
  floorNumber: z.number().min(0, {
    message: "Must be a positive number.",
  })
});

export default function FloorForm({
  floor,
  floors,
  onSubmit,
  onCancel,
  isLoading,
}: {
  floor?: Floor;
  floors?: Floor[];
  onSubmit: (table: z.infer<typeof floorFormSchema>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}) {
  const form = useForm<z.infer<typeof floorFormSchema>>({
    resolver: zodResolver(floorFormSchema),
    defaultValues: {
      floorNumber:floor?.floorNumber ?? 2
    },
  });

  function onSubmitForm(values: z.infer<typeof floorFormSchema>) {
    let isExist = false;
    floors?.forEach((f) => {
        if (f.floorNumber === values.floorNumber) {
            form.setError("floorNumber", {
            type: "manual",
            message: "Floor number already exists",
            });
            isExist = true;
        }
        return;
    });
    if(!isExist)
        onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <FormField
          disabled={isLoading}
          control={form.control}
          name="floorNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter floor number" 
                  type="number" 
                  {...field} 
                  onChange={(e) => {
                    form.setValue("floorNumber", parseInt(e.target.value));
                  }}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
