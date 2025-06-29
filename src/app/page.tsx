'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const [value, setValue] = useState("");
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
      <div className=" p-4 max-w-7xl mx-auto">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ value:value })}>
          Invoke Inngest
        </Button>
      </div>
    </>
  );
}
