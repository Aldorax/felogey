import ProfileCompnent from "@/components/dashboard/ProfileComponent";

export const metadata = {
  title: "Profile - Enetworks Agency Banking",
  description: "View and edit your profile",
};

export default function Profile() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 md:py-10">
      <ProfileCompnent />
    </section>
  );
}
