import type { Metadata } from "next";

const metadata: Metadata = {
  title: "Fundraiser",
  description: "fun",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
export default MainLayout;
