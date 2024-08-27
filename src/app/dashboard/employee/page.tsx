import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import prisma from "@/lib/db";
import { DataTable } from "./data-table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddEmployeeForm from "@/components/AddEmployeeForm";

export default async function Employee() {
  const employeeData = await prisma.employee.findMany();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="p-4 my-3">
              Tambah Employee
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Tambah Employee/Marketing</SheetTitle>
            </SheetHeader>
            <AddEmployeeForm />
          </SheetContent>
        </Sheet>
      </div>
      <DataTable columns={columns} data={employeeData} />
    </div>
  );
}
