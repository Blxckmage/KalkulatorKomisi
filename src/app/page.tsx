import Calculator from "@/components/Calculator";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="container mx-auto h-full min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <Calculator />
    </main>
  );
}
