"use client";

import { PasswordGenerator } from "@/components/PasswordGenerator/PasswordGenerator";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center  p-8">
      <PasswordGenerator />
    </div>
  );
}
