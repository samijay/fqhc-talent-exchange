"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createAuthClient } from "@/lib/supabase-client";
import type { User, SupabaseClient } from "@supabase/supabase-js";

// ── Types ──

interface UserProfile {
  display_name: string | null;
  role: "executive" | "manager" | "clinician" | "job_seeker";
  organization: string | null;
  organization_slug: string | null;
  region: string | null;
  onboarding_completed: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ── Context ──

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

// ── Provider ──

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Create a stable Supabase client instance
  // Wrapped in try/catch so the app renders even if Supabase client init fails
  const [supabase] = useState<SupabaseClient | null>(() => {
    try {
      return createAuthClient();
    } catch {
      return null;
    }
  });

  // Fetch user profile from user_profiles table
  const fetchProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("display_name, role, organization, organization_slug, region, onboarding_completed")
          .eq("id", userId)
          .single();

        if (!error && data) {
          setProfile(data as UserProfile);
        }
      } catch {
        // Profile fetch failed — continue without profile
      }
    },
    [supabase]
  );

  // Refresh profile (called after settings changes)
  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!supabase) {
      // No Supabase client — skip auth entirely, render as unauthenticated
      setLoading(false);
      return;
    }

    // Get the initial session
    supabase.auth
      .getUser()
      .then(({ data: { user: currentUser } }) => {
        setUser(currentUser);
        if (currentUser) {
          fetchProfile(currentUser.id);
        }
        setLoading(false);
      })
      .catch(() => {
        // Supabase unreachable — continue as unauthenticated
        setLoading(false);
      });

    // Listen for auth state changes (login, logout, token refresh)
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const result = supabase.auth.onAuthStateChange((_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (sessionUser) {
          fetchProfile(sessionUser.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      });
      subscription = result.data.subscription;
    } catch {
      // Auth listener failed — continue without it
      setLoading(false);
    }

    return () => subscription?.unsubscribe();
  }, [supabase, fetchProfile]);

  // Sign out and redirect to homepage
  const signOut = useCallback(async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Sign out failed — clear local state anyway
      }
    }
    setUser(null);
    setProfile(null);
    window.location.href = "/";
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──

export const useAuth = () => useContext(AuthContext);
