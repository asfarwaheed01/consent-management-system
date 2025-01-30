"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { UserInterface, AuthTokens, AuthState } from "@/interfaces";
import { useRouter } from "next/navigation";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Action types
type AuthAction =
  | { type: "SET_USER"; payload: UserInterface }
  | { type: "SET_TOKENS"; payload: AuthTokens }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<UserInterface> };

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "SET_TOKENS":
      return {
        ...state,
        tokens: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

// Context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<UserInterface>) => void;
  handleSuccess: (message: string) => void;
  handleError: (error: unknown) => void;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { toast } = useToast();
  const router = useRouter();

  // Global success handler
  const handleSuccess = useCallback(
    (message: string) => {
      toast({
        title: "Success",
        description: message,
        duration: 5000,
        className: "bg-green-500 text-white",
      });
    },
    [toast]
  );

  // Global error handler
  const handleError = useCallback(
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;

        if (axiosError.response) {
          const status = axiosError.response.status;
          const data = axiosError.response.data;

          switch (status) {
            case 401:
              toast({
                title: "Authentication Error",
                description: "Your session has expired. Please log in again.",
                variant: "destructive",
              });
              dispatch({ type: "LOGOUT" });
              router.push("/login");
              break;
            case 403:
              toast({
                title: "Permission Denied",
                description:
                  "You don't have permission to perform this action.",
                variant: "destructive",
              });
              break;
            default:
              toast({
                title: "Error",
                description: data?.message || "An unexpected error occurred",
                variant: "destructive",
              });
          }
        } else if (axiosError.request) {
          toast({
            title: "Network Error",
            description:
              "Unable to connect to the server. Please check your internet connection.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
      console.error("Error details:", error);
    },
    [toast, router]
  );

  // Login function
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.post(
        `${BackendUrl}/api/users/login/`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { refresh, access, user } = response.data;

      // Store tokens and user data
      dispatch({ type: "SET_TOKENS", payload: { refresh, access } });
      dispatch({ type: "SET_USER", payload: user });

      // Store tokens in localStorage
      localStorage.setItem("access-token", access);
      localStorage.setItem("refresh-token", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      handleSuccess("Successfully logged in!");
      router.push("/dashboard");
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    handleSuccess("Successfully logged out");
    router.push("/");
  }, [handleSuccess, router]);

  // Update user function
  const updateUser = useCallback((userData: Partial<UserInterface>) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  }, []);

  const refreshTokens = async () => {
    try {
      const refreshToken = state.tokens?.refresh;
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(
        `${BackendUrl}/api/users/token/refresh/`,
        { refresh: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access } = response.data;

      // Ensure `refresh` is non-optional
      dispatch({
        type: "SET_TOKENS",
        payload: { access, refresh: refreshToken },
      });

      localStorage.setItem(
        "tokens",
        JSON.stringify({ ...state.tokens, access })
      );
    } catch (error) {
      handleError(error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateUser,
        handleSuccess,
        handleError,
        isLoading: state.isLoading,
        refreshTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
