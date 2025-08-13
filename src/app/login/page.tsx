"use client";

import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange(async (_e, session) => {
      if (session) router.replace("/gate"); // role check happens here
    });
    return () => sub.data.subscription.unsubscribe();
  }, [router]);

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          view="sign_in"
          redirectTo={
            typeof window !== "undefined"
              ? `${window.location.origin}/gate`
              : undefined
          }
        />
      </div>
    </div>
  );
}
