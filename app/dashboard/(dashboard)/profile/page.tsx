"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X, Camera, Calendar, Mail, AtSign } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Schema for form validation
const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const { handleError, handleSuccess } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem("access-token");
        const response = await axios.get(
          "http://localhost:8000/api/users/user-details/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUserData(response.data);
        setValue("username", response.data.username || "");
        setValue("email", response.data.email || "");
        setValue("first_name", response.data.first_name || "");
        setValue("last_name", response.data.last_name || "");
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [setValue, handleError]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const accessToken = localStorage.getItem("access-token");

      await axios.patch(
        "http://localhost:8000/api/users/update-profile/",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      handleSuccess("Profile updated successfully!");
      setIsEditing(false);

      // Refresh user data
      const response = await axios.get(
        "http://localhost:8000/api/users/user-details/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Get user's initials for avatar
  const getInitials = () => {
    if (!userData) return "U";
    if (userData.first_name && userData.last_name) {
      return `${userData.first_name[0]}${userData.last_name[0]}`.toUpperCase();
    }
    return userData.username ? userData.username[0].toUpperCase() : "U";
  };

  const formatDate = (dateString: string) => {
    if (!isClient) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="mt-20 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Banner Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl">
                <AvatarImage src="" alt={userData?.username || "User"} />
                <AvatarFallback className="text-3xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-black dark:bg-white rounded-full text-white dark:text-black hover:opacity-80 transition-opacity shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-20 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData?.first_name && userData?.last_name
                    ? `${userData.first_name} ${userData.last_name}`
                    : userData?.username || "User Profile"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userData?.email}
                </p>
              </div>
              <Button
                onClick={() =>
                  isEditing ? handleSubmit(onSubmit)() : setIsEditing(true)
                }
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                {isEditing ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>

            {/* Form */}
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                    <Input
                      {...register("username")}
                      disabled={!isEditing}
                      className={`pl-10 ${
                        !isEditing ? "bg-gray-50 dark:bg-gray-700" : ""
                      }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                    <Input
                      {...register("email")}
                      disabled
                      className="pl-10 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <Input
                    {...register("first_name")}
                    disabled={!isEditing}
                    className={`${
                      !isEditing ? "bg-gray-50 dark:bg-gray-700" : ""
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <Input
                    {...register("last_name")}
                    disabled={!isEditing}
                    className={`${
                      !isEditing ? "bg-gray-50 dark:bg-gray-700" : ""
                    }`}
                  />
                </div>

                {userData?.date_joined && (
                  <div className="col-span-2">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Member since {formatDate(userData.date_joined)}
                      </span>
                    </div>
                  </div>
                )}
              </form>
            )}

            {isEditing && (
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300 dark:border-gray-600"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
