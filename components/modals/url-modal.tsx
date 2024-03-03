import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  generatedUrl: string;
}

export const UrlModal = ({ generatedUrl }: Props) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard
      .writeText(generatedUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  const onClose = () => {
    window.location.reload();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-[400px]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Link Generated
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            copy the link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-72"
              defaultValue={generatedUrl}
              readOnly
            />
            <Button size="icon" onClick={onCopy}>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <a href={generatedUrl}>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
