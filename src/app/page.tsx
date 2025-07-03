'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const [value, setValue] = useState("");
  const {data} = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: (data) => {
      console.log(data);
      toast.success("Message created");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Message creation failed");
    },
  }));
  return (
    <>
      <div className=" p-4 max-w-7xl mx-auto">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button disabled={createMessage.isPending} onClick={() => createMessage.mutate({ value:value })}>
          Create Message
        </Button>
      </div>
      <div className=" p-4 max-w-7xl mx-auto">
        <pre>{JSON.stringify(data,null,2)}</pre>
      </div>
    </>
  );
}
