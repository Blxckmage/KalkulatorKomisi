"use client";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Employee, EmployeeSchema } from "@/types/employee.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { createEmployee } from "@/hooks/Employee";
import { SheetClose, SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AddEmployeeForm = () => {
  const router = useRouter();
  const form = useForm<Employee>({
    resolver: zodResolver(EmployeeSchema),
  });

  async function onSubmit(values: Employee) {
    const response = await createEmployee(values);

    if (response) {
      router.refresh();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="amount">Name</FormLabel>
                <FormControl>
                  <Input id="name" className="col-span-3" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save Changes</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </form>
    </Form>
  );
};

export default AddEmployeeForm;
