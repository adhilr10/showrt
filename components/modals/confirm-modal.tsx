import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UrlModal } from "./url-modal";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useOrigin } from "../use-orgin";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";

interface ConfirmModalProps {
  mounted: boolean;
  onClose: () => void;
  upiId: string;
  upiName: string;
  upiNumber: number;
}

const ConfirmModal = ({
  mounted,
  onClose,
  upiId,
  upiName,
  upiNumber,
}: ConfirmModalProps) => {
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const origin = useOrigin();
  const { user } = useUser();

  const ogName = `${upiName}`;
  const name = ogName.replace(" ", "%20");

  const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&cu=INR`;
  const upiUrl1 = `upi://pay?pa=${upiNumber}&pn=${name}&cu=INR`;

  const handleSave = async () => {
    onClose();
    const uuid = uuidv4();
    const url = `${origin}/open/${uuid}`;
    setGeneratedUrl(url);
    setShowUrlModal(true);

    try {
      if (!user) return;
      const newCollectionRef = collection(db, "urls");
      await addDoc(newCollectionRef, {
        id: uuid,
        upiUrl: upiUrl,
        upiUrl1: upiUrl1,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding document to new collection: ", error);
    }
  };

  return (
    <>
      {mounted ? (
        <Dialog open onOpenChange={onClose}>
          <DialogContent className="max-w-[380px] md:max-w-[410]">
            <DialogHeader>
              <DialogTitle className="text-center text-red-500">
                Confirm the form
              </DialogTitle>
              <DialogDescription className="text-center">
                Please ensure that all UPI details are entered correctly
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center ">
                <Label htmlFor="name" className="pl-3">
                  UPI Name
                </Label>
                <Input
                  id="name"
                  value={upiName}
                  className="col-span-3 w-64"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  UPI Id
                </Label>
                <Input
                  id="username"
                  value={upiId}
                  className="col-span-3 w-64"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  UPI Number
                </Label>
                <Input
                  id="username"
                  value={upiNumber}
                  className="col-span-3 w-64"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter className="">
              <div className="flex justify-around gap-x-2">
                <Button onClick={onClose} type="submit" className="w-24">
                  Edit form
                </Button>
                <Button onClick={handleSave} type="submit" className="w-24">
                  Save changes
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        showUrlModal && <UrlModal generatedUrl={generatedUrl} />
      )}
    </>
  );
};

export default ConfirmModal;
