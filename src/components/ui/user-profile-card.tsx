
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, ActivityIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface UserProfileCardProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
    initials?: string;
  };
  className?: string;
}

export function UserProfileCard({ user, className }: UserProfileCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="bg-applock-primary h-20 w-full" />
      <div className="flex justify-center">
        <Avatar className="h-24 w-24 border-4 border-background -mt-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-lg font-medium bg-applock-purple-light text-applock-purple">
            {user.initials || user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="text-center pt-4">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-muted-foreground">{user.role}</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-2"
          asChild
        >
          <Link to="/user-profile">
            <Edit className="h-4 w-4" /> Edit Profile
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 gap-2"
          asChild
        >
          <Link to="/activity-log">
            <ActivityIcon className="h-4 w-4" /> Activity Log
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
