'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createClient, isSupabaseConfigured } from './client';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: false,
  isPremium: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase || !session?.user) {
      setIsPremium(false);
      return;
    }

    let cancelled = false;

    supabase
      .from('subscriptions')
      .select('status, current_period_end')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data) return;
        const active =
          data.status === 'active' &&
          (!data.current_period_end || new Date(data.current_period_end) > new Date());
        setIsPremium(active);
      });

    return () => {
      cancelled = true;
    };
  }, [session]);

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, session, loading, isPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
