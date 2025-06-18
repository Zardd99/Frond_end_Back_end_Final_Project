import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../../../../server/middleware/supabaseClient";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //
  // Fetch User Role
  //
  //
  const handleAuthState = async (session) => {
    setSession(session);

    if (session?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, banned_until")
        .eq("user_id", session.user.id)
        .single();

      setUser({
        ...session.user,
        role: profile?.role || "user",
        banned_until: profile?.banned_until,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        await handleAuthState(session);
      } catch (error) {
        console.error("Session fetch error:", error);
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        localStorage.removeItem("sb-access-token");
        localStorage.removeItem("sb-refresh-token");
      }
      handleAuthState(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthState(session);
    });
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED") {
        console.log("Token refreshed successfully");
      } else if (event === "SIGNED_OUT" || event === "USER_DELETED") {
        localStorage.removeItem("sb-access-token");
        localStorage.removeItem("sb-refresh-token");
      }
      handleAuthState(session);
    });
  }, []);

  //
  // sign out
  //
  //
  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("sb-access-token");
    localStorage.removeItem("sb-refresh-token");
  };

  const value = {
    session,
    signOut,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const signUpNewUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return {
          success: false,
          error: { message: "Email already registered" },
        };
      }
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    //
    //
    // Debugging: Log the error to the console
    //
    console.error("An unexpected error occurred during registration:", error);
    return {
      success: false,
      error: { message: "Registration failed" },
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Log in error occurred:", error);
      return { success: false, error: error.message };
    }
    console.log("Login success:", data);
    return { success: true, data };
  } catch (error) {
    console.error("An unexpected error occurred during login:", error);
    return {
      success: false,
      error: { message: "An unexpected error occurred." },
    };
  }
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
