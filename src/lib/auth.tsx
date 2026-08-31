import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
  is_creator: boolean;
  created_at: string;
  updated_at: string;
}

export type AppRole = "admin" | "moderator" | "user";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: AppRole[];
  loading: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  isCreator: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (currentUser: User | null) => {
    if (!currentUser) {
      setProfile(null);
      setRoles([]);
      return;
    }

    try {
      // Fetch profile
      const { data: profData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profData) {
        setProfile(profData as Profile);
      } else {
        // Fallback default profile from auth meta
        setProfile({
          id: currentUser.id,
          username: currentUser.email?.split("@")[0] || "user",
          display_name: currentUser.user_metadata?.display_name || currentUser.email?.split("@")[0] || "User",
          bio: null,
          avatar_url: currentUser.user_metadata?.avatar_url || null,
          website: null,
          is_creator: false,
          created_at: currentUser.created_at,
          updated_at: currentUser.created_at,
        });
      }

      // Fetch user roles
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id);

      if (roleData && roleData.length > 0) {
        setRoles(roleData.map((r: { role: AppRole }) => r.role));
      } else {
        setRoles(["user"]);
      }
    } catch (err) {
      console.error("Error fetching user profile/roles:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          if (data.session?.user) {
            await fetchUserData(data.session.user);
          }
        }
      } catch (err) {
        console.error("Error checking auth session:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await fetchUserData(newSession.user);
        } else {
          setProfile(null);
          setRoles([]);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || email.split("@")[0],
        },
      },
    });

    if (!error && data.user) {
      // Ensure profile entry exists
      await supabase.from("profiles").upsert({
        id: data.user.id,
        display_name: displayName || email.split("@")[0],
        username: (email.split("@")[0] + "-" + Math.random().toString(36).substring(2, 6)).toLowerCase(),
      });
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRoles([]);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserData(user);
    }
  };

  const isAdmin = roles.includes("admin");
  const isStaff = roles.includes("admin") || roles.includes("moderator");
  const isCreator = profile?.is_creator || isStaff;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        roles,
        loading,
        isAdmin,
        isStaff,
        isCreator,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
