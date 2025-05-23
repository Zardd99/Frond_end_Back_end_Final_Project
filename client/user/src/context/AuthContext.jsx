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
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      setUser({
        ...session.user,
        role: profile?.role || "user",
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthState(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthState(session);
    });
  }, []);

  //
  // sign out
  //
  //
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error("There an error", error);
    }
  };

  const value = {
    session,
    signUpNewUser,
    signOut,
    loginUser,
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
      email: email,
      password: password,
      options: {
        data: {
          username: email.split("@")[0],
        },
      },
    });
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id);

    if (error) {
      console.error("There was a problem signing up", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: { message: "Registration failed. Please try again." },
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
      console.error("log in error occurred", error);
      return { success: false, error: error.message };
    }
    console.log("login success", data);
    return { success: true, data };
  } catch (error) {
    console.error("an error occurred", error);
  }
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
