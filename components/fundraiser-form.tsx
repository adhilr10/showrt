import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import ConfirmModal from "./modals/confirm-modal";
import { FileType } from "@/typings";

const FundraiserForm = () => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]); // Initialize files state as an empty array

  const { user } = useUser();

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "UPI name must be at least 2 characters long." })
      .max(50, { message: "UPI name cannot exceed 50 characters." }),

    id: z
      .string()
      .regex(/@/, { message: "UPI Id must contain '@' symbol." })
      .min(4, { message: "UPI Id must be at least 4 characters long." })
      .max(40, { message: "UPI Id cannot exceed 40 characters." })
      .refine((s) => !s.includes(" "), {
        message: "UPI Id must not contain spaces.",
      }),

    number: z
      .string()
      .min(13, { message: "UPI number must consist of at least 10 digits." })
      .max(13, { message: "UPI number must have 10+ digits, no spaces." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
      number: "+91",
    },
  });

  useEffect(() => {
    if (!user || !user.id) return;

    const q = query(
      collection(db, "users", user.id, "files"),
      orderBy("timestamp", "desc") // Sort by recent to oldest
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedFiles = querySnapshot.docs.map((doc) => {
        const data = doc.data() as FileType;
        const id = doc.id;
        return { ...data, id };
      });

      const newestFile = fetchedFiles[0];
      setFiles([newestFile]);
    });

    return () => unsubscribe();
  }, [user?.id]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (loading) return;
    setLoading(true);
    if (!user) return;

    try {
      await addDoc(collection(db, "users", user.id, "files"), {
        id: user.id,
        upiName: data.name,
        upiId: data.id.toLowerCase(),
        upiNumber: data.number,
        timestamp: serverTimestamp(),
      });
      setMounted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setMounted(false);
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-white"
      >
        <h2 className="text-lg font-bold text-center">Fill the Form</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UPI Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-black mb-5"
                  placeholder="Enter UPI name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UPI ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-black mb-5"
                  placeholder="Enter UPI ID"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UPI Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-black"
                  placeholder="Enter UPI number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {files.length > 0 &&
            files.map((file) => {
              if (file && file.upiName && file.upiId && file.upiNumber) {
                return (
                  <ConfirmModal
                    key={file.upiId}
                    mounted={mounted}
                    onClose={handleCloseModal}
                    upiName={file.upiName}
                    upiId={file.upiId}
                    upiNumber={file.upiNumber}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
      </form>
    </Form>
  );
};

export default FundraiserForm;
