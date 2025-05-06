import Navbar from "@/components/dashboard/navbar";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
