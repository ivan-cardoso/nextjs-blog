"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p className="text-sm 2xl:text-base uppercase font-semibold text-primary tracking-wider mb-3">
          User {session.user?.name}
        </p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  return <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>;
}
