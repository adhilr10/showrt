"use client";
import { useState, useEffect } from "react";
import { MoreHorizontalIcon } from "lucide-react";

export default function Custom404() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <MoreHorizontalIcon className="animate-spin w-24 h-28" color="white" />{" "}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">404 - Page Not Found</h1>
        <p>This link is not available! <a href="/" className="underline text-blue-500">Back to home</a></p>

      </div>
    );
  }
}
