"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/tools/password")}
      className="flex flex-col items-center justify-between p-12 border-2 border-white rounded-lg"
    >
      <div className="flex flex-col items-center justify-between p-12">
        <h1 className="text-4xl font-bold">Password Generator</h1>
        <p className="text-2xl font-bold">Generate a random password</p>
      </div>
    </div>
  );
}
