import DashboardChart from "@/components/DashboardChart";
import { getAllJobs } from "@/hooks/Job";
import { Job } from "@/types/job.types";

export default async function Dashboard() {
  const jobsData: Job[] = await getAllJobs();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardChart data={jobsData} />
      </div>
    </div>
  );
}
