import { Header } from "@/components/header";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <Header />
      <div className="px-5 lg:px-20 py-5">{children}</div>
    </div>
  );
}
