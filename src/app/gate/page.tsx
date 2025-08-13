"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  role: "super_admin" | "owner" | "staff" | "pending";
  approved: boolean;
};

export default function Gate() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return router.replace("/login");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, approved")
        .eq("id", user.id)
        .single();

      if (!profile) return router.replace("/login");
      if (!profile.approved || profile.role === "pending")
        return router.replace("/awaiting-approval");

      if (profile.role === "staff") return router.replace("/pos");
      return router.replace("/admin");
    })().finally(() => setLoading(false));
  }, [router]);

  if (loading)
    return (
      <div className="grid place-items-center min-h-screen">
        Checking access…
      </div>
    );
  return null;
}
