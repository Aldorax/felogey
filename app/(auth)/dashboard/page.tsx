import DashboardCompnent from "@/components/dashboard/DashboardCompnent";

export const metadata = {
  title: "Dashboard - Enetworks Agency Banking",
  description: "Visit your dashboard to use features available",
};

export default function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 md:py-10">
      <DashboardCompnent />
    </section>
  );
}
