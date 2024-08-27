import Calculator from "@/components/Calculator";
import Navbar from "@/components/Navbar";
import { getAllEmployees } from "@/hooks/Employee";

export default async function Home() {
  const employees = await getAllEmployees();
  return (
    <main className="container mx-auto h-full min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <Calculator employees={employees} />
    </main>
  );
}
