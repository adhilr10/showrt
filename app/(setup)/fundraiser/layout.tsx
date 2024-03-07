import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundraiser",
  description: "Generate UPI redirect links",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
export default MainLayout;
