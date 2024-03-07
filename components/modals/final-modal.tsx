"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  strUrl: string;
  strUrl1: string;
  handleCloseModal: () => void;
}

const FinalModal = ({ strUrl, strUrl1, handleCloseModal }: Props) => {
  const [copiedButton, setCopiedButton] = useState<number | null>(null);
  const router = useRouter();

  // Define regular expressions to extract the desired components
  const paRegex = /pa=([^&]+)/;
  const pnRegex = /pn=([^&]+)/;
  const numberRegex = /(\d+)/;

  // Function to extract username, name, and number from the UPI URL
  function extractComponents(upiUrl: string) {
    const usernameMatch = upiUrl.match(paRegex);
    const nameMatch = upiUrl.match(pnRegex);
    const numberMatch = upiUrl.match(numberRegex);

    let upiId = "";
    let name = "";
    let number = "";

    if (usernameMatch && usernameMatch[1]) {
      upiId = usernameMatch[1];
    }

    if (nameMatch && nameMatch[1]) {
      // Replace %20 with space
      name = nameMatch[1].replace(/%20/g, " ");
    }

    if (numberMatch && numberMatch[1]) {
      number = numberMatch[1];
      // If number starts with +91, remove it
      if (number.startsWith("91")) {
        number = number.substring(2);
      }
    }

    return { upiId, name, number };
  }

  // Extract components from the UPI URLs
  const components1 = extractComponents(strUrl);
  const components2 = extractComponents(strUrl1);

  const onCopy = (text: string, buttonIndex: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedButton(buttonIndex);
        setTimeout(() => {
          setCopiedButton(null);
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  return (
    <Dialog open onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-[380px] md:max-w-[410px]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Details
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            copy the details
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-72 md:w-80"
              readOnly
              defaultValue={components1.name}
            />

            <Button size="icon" onClick={() => onCopy(components1.name, 0)}>
              {copiedButton === 0 ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-72 md:w-80"
              readOnly
              defaultValue={components1.upiId}
            />

            <Button size="icon" onClick={() => onCopy(components1.upiId, 1)}>
              {copiedButton === 1 ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-72 md:w-80"
              readOnly
              defaultValue={components2.number}
            />

            <Button size="icon" onClick={() => onCopy(components2.number, 2)}>
              {copiedButton === 2 ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinalModal;
