import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <>
      <div className="font-bold">Hello World</div>
      <Button>Hello</Button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}
