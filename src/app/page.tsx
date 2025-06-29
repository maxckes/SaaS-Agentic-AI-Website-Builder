'use client';
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: (data) => {
      console.log(data);
      toast.success("Event sent");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Event failed");
    },
  }));
  return (
    <>
      <div className="text-2xl font-bold p-4 max-w-7xl mx-auto">
        <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: "test" })}>
          Invoke Inngest
        </Button>
      </div>
    </>
  );
}
