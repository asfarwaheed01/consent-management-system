"use client";

import React from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { app } from "@/utils/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string(),
  // .min(8, { message: "Password must be at least 8 characters" })
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter",
  // })
  // .regex(/[a-z]/, {
  //   message: "Password must contain at least one lowercase letter",
  // })
  // .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const auth = getAuth(app);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { login, handleError } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      handleError(error);
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      toast({
        title: "Success",
        description: "Successfully logged in with Google!",
      });
      console.log("The Response is", result);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="w-full flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-white dark:text-black" />
            </div>
            <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Login to continue to your account
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email address"
                  className={`pl-10 ${
                    errors.email ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <div className="py-2 flex items-center gap-2 text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  className={`pl-10 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <div className="py-2 flex items-center gap-2 text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.password.message}</AlertDescription>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  id="remember"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-black dark:text-white hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-black"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full mt-4 flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-700"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                fill="#4285F4"
              />
              <path
                d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.24 19.252C9.0792 19.252 6.4034 17.1399 5.4361 14.3003H1.4375V17.3912C3.4173 21.4434 7.5446 24.0008 12.24 24.0008Z"
                fill="#34A853"
              />
              <path
                d="M5.4361 14.3003C5.2054 13.5721 5.0777 12.7952 5.0777 12.0006C5.0777 11.2059 5.2054 10.429 5.4361 9.70085V6.61005H1.4375C0.724306 8.23895 0.333313 10.0433 0.333313 12.0006C0.333313 13.9578 0.724306 15.7622 1.4375 17.3911L5.4361 14.3003Z"
                fill="#FBBC05"
              />
              <path
                d="M12.24 4.74966C14.0217 4.74966 15.6237 5.36715 16.8577 6.54066L20.2717 3.12663C18.2058 1.18513 15.4764 0 12.24 0C7.5446 0 3.4173 2.55733 1.4375 6.61005L5.4361 9.70085C6.4034 6.86131 9.0792 4.74966 12.24 4.74966Z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign in with Google</span>
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don`&apos;`t have an account?{" "}
            <a
              href="/signup"
              className="text-black dark:text-white hover:underline"
            >
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
