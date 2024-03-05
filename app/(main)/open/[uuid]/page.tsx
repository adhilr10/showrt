"use client"

import Custom404 from "@/app/not-found";
import Showrt from "@/components/showrt";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UpiData {
  upiUrl: string;
  upiUrl1: string;
  id: string;
}

const MainPage = ({ params }: { params: { uuid: string } }) => {
  const [upiData, setUpiData] = useState<UpiData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUpiData = async () => {
      try {
        const q = query(
          collection(db, "urls"),
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => doc.data() as UpiData);
        setUpiData(data);
      } catch (error) {
        console.error("Error fetching UPI data: ", error);
      }
    };

    fetchUpiData();
  }, []);

  useEffect(() => {
    upiData.forEach((data) => {
      if (data && data.upiUrl && params.uuid === data.id) {
        const strUrl = data.upiUrl;
        const strUrl1 = data.upiUrl1;

        const redirectTimer = setTimeout(() => {
          router.push(strUrl);
        }, 1000);
        
        const redirectTimer1 = setTimeout(() => {
          router.push(strUrl1);
        }, 5000);

        return () => {
          clearTimeout(redirectTimer);
          clearTimeout(redirectTimer1);
        };
      }
    });
  }, [upiData, params.uuid, router]);

  const isUpiDataAvailable = upiData.some((data) => data.id === params.uuid);

  return <>{isUpiDataAvailable ? <Showrt /> : <Custom404 />}</>;
};

export default MainPage;
