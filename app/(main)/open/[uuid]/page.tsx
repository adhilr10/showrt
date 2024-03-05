"use client";

import Custom404 from "@/app/not-found";
import FinalModal from "@/components/modals/final-modal";
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
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [strUrl, setStrUrl] = useState("");
  const [strUrl1, setStrUrl1] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUpiData = async () => {
      try {
        const q = query(collection(db, "urls"), orderBy("timestamp", "desc"));

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
        setStrUrl(data.upiUrl);
        setStrUrl1(data.upiUrl1);

        const redirectTimer = setTimeout(() => {
          router.push(data.upiUrl);
        }, 1000);

        const redirectTimer1 = setTimeout(() => {
          router.push(data.upiUrl1);
        }, 3500);

        const finalRedirect = setTimeout(() => {
          setShowFinalModal(true);
        }, 5000);

        return () => {
          clearTimeout(redirectTimer);
          clearTimeout(redirectTimer1);
          clearTimeout(finalRedirect);
        };
      }
    });
  }, [upiData, params.uuid, router]);

  const handleCloseModal = () => {
    setShowFinalModal(false)
  };

  const isUpiDataAvailable = upiData.some((data) => data.id === params.uuid);
  return (
    <>
      {isUpiDataAvailable ? <Showrt /> : <Custom404 />}
      {showFinalModal && (
        <FinalModal
          strUrl={strUrl}
          strUrl1={strUrl1}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default MainPage;
