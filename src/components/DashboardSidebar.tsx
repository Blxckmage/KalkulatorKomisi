import clsx from "clsx";
import { ScrollText, User2Icon } from "lucide-react";
import Link from "next/link";

export default async function DashboardSideBar() {
  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link
            className="flex items-center gap-2 font-semibold ml-1"
            href="/dashboard"
          >
            <span>Kalkulator Komisi</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              )}
              href="/dashboard"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <ScrollText className="h-3 w-3" />
              </div>
              Report
            </Link>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              )}
              href="/dashboard/employee"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <User2Icon className="h-3 w-3" />
              </div>
              Employee/Marketing
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
