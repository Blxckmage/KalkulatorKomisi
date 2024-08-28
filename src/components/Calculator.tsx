"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Job, JobSchema } from "@/types/job.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { createJob } from "@/hooks/Job";
import { Employee } from "@/types/employee.types";

const Calculator = ({ employees }: { employees: Employee[] }) => {
  const [commission, setCommission] = useState(0);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const form = useForm<Job>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      commission: commission,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (name === "gross_profit") {
        const grossProfit = values.gross_profit;
        const calculatedCommission = (grossProfit || 0) * 0.1;
        setCommission(calculatedCommission);
      }

      if (name === "employee.name") {
        const employee = employees.find(
          (employee) => employee.name === values.employee?.name,
        );
        if (employee) {
          setEmployeeId(employee.id as number);
        }
      }

      return () => subscription.unsubscribe();
    });
  }, [form.watch]);

  async function onSubmit(values: Job) {
    try {
      const newValues = {
        ...values,
        employeeId: employeeId as number,
        commission: commission as number,
      };
      const response = await createJob(newValues);

      if (response) {
        console.log("Job created successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Kalkulator Komisi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="employee.name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="marketing">Marketing/Employee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="marketing">
                        <SelectValue placeholder="Pilih marketing/employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.name}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period_job"
              render={({ field }) => (
                <FormItem className="space-y-2 flex flex-col">
                  <FormLabel htmlFor="period_job">Period Job</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "dd MMMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : new Date()
                        }
                        onSelect={field.onChange as any}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      id="amount"
                      placeholder="Masukkan nilai total dari job"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gross_profit"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="gross_profit">Gross Profit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      id="gross_profit"
                      placeholder="Masukkan gross profit dari job"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start space-y-4">
            <div className="w-full space-y-2">
              <div className="flex justify-between font-bold">
                <span>Total Komisi</span>
                {commission ? (
                  <span>
                    {commission.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                ) : (
                  <span>Rp. 0</span>
                )}
              </div>
            </div>
            <Button className="w-full" type="submit">
              Tambahkan Job
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default Calculator;
