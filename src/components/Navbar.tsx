import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <span className="text-2xl font-bold text-primary-500">
              <span className="ml-2">Kalkulator Komisi</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="/dashboard"
              className="font-medium flex items-center text-sm transition-color"
              prefetch={false}
            >
              <Button variant={"outline"}>Dashboard</Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
