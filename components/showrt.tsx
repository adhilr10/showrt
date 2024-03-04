"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";

const Showrt = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const newCollectionRef = collection(db, "waitlist");
      await addDoc(newCollectionRef, {
        email: email,
      });
      setEmail("");
    } catch (error) {
      console.error("Error adding document to new collection: ", error);
    }
  };

  return (
    <>
      <div className="flex justify-between p-2">
        <Link href="/">
          <h2 className="text-2xl font-bold text-white">Showrt</h2>
        </Link>
        <div className="space-x-2">
          <Link href="/fundraiser">
            <Button variant="primary">Fundraiser</Button>
          </Link>
        </div>
      </div>
      <div className="text-center mt-28">
        <h1 className="text-8xl md:text-9xl font-semibold mt-4 mb-8 bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] inline-block text-transparent bg-clip-text">
          Showrt
        </h1>
        <p className="text-blue-200 mb-3">
          Create,collect and discover. <br />
          Join the waitlist to get early access.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex  justify-center gap-2 p-2 md:p-0">
            <Input
              type="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Join waitlist
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Showrt;
