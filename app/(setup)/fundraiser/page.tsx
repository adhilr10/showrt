"use client"
import FundraiserForm from "@/components/fundraiser-form";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Fundraiser = () => {
  return (
    <>
     
        <div>
          <div className="flex justify-between p-2">
            <Link href="/">
              <h2 className="text-2xl font-bold text-white">Showrt</h2>
            </Link>
            <UserButton afterSignOutUrl="/" />
          
          </div>
          <div className="flex flex-col justify-center items-center mt-24">
            <FundraiserForm />
          </div>
        </div>
    </>
  );
};

export default Fundraiser;
