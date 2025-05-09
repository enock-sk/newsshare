import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StaffNewsTable from "../../../components/StaffNewsTable";

export default async function StaffDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/staff/login");
  }

  return (
    <main className="py-12">
      <StaffNewsTable />
    </main>
  );
}
