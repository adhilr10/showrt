"use client";
import Custom404 from "@/app/not-found";
import Showrt from "@/components/showrt";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useEffect, useState } from "react";

interface UpiData {
  upiUrl: string;
  upiUrl1: string;
  id: string;
}

const MainPage = ({ params }: { params: { uuid: string } }) => {
  const { user } = useUser();
  const [upiData, setUpiData] = useState<UpiData | null>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isUpiDataAvailable, setIsUpiDataAvailable] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const fetchUpiData = async () => {
      try {
        const q = query(
          collection(db, "urls"),
          orderBy("timestamp", "desc") // Sort by recent to oldest
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as UpiData;
          setUpiData(data);
        } else {
          console.log("No UPI data found.");
        }
      } catch (error) {
        console.error("Error fetching UPI data: ", error);
      }
    };

    fetchUpiData();
  }, [params.uuid]);

  useEffect(() => {
    if (upiData && upiData.upiUrl && params.uuid === upiData.id) {
      setIsUpiDataAvailable(true);

      const strUrl = upiData.upiUrl;
      const strUrl1 = upiData.upiUrl1;
      const redirectTimer = setTimeout(() => {
        router.push(strUrl);
      }, 1000);
      const redirectTimer1 = setTimeout(() => {
        router.push(strUrl1);
      }, 8000);

      return () => {
        clearTimeout(redirectTimer);
        clearTimeout(redirectTimer1);
      };
    }
  }, [upiData, params.uuid]);

  return <>{isUpiDataAvailable ? <Showrt /> : <Custom404 />}</>;
};

export default MainPage;
