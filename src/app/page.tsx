'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const trpc = useTRPC();
  const [value, setValue] = useState("");
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      router.push(`/projects/${data.id}`);
    },
  }));
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 items-center justify-center">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button disabled={createProject.isPending} onClick={() => createProject.mutate({ value:value })}>
            Submit
          </Button>
        </div>
      </div>

    </>
  );
}
