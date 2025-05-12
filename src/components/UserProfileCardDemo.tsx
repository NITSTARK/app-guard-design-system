
import React from "react";
import { UserProfileCard } from "@/components/ui/user-profile-card";

const UserProfileCardDemo = () => {
  // Sample user data
  const user = {
    name: "Admin User",
    role: "Administrator",
    avatar: "https://i.pravatar.cc/150?img=12",
    initials: "AU",
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User Profile Card</h2>
      <UserProfileCard user={user} />
    </div>
  );
};

export default UserProfileCardDemo;
