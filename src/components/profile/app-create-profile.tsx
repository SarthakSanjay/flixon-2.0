"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useProfile from "@/hooks/use-profile";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
export default function CreateProfile() {
  const { createUserProfile, loading, error } = useProfile();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(
    "https://www.thestatesman.com/wp-content/uploads/2024/04/Avatar-3.jpg",
  );

  const handleSet = async () => {
    if (!username) {
      toast({
        description: "username is empty",
      });
    }
    const res = await createUserProfile(
      "67cee6bc6566ff7357a3d110",
      username,
      avatar,
    );
  };
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-2xl">Create Profile</h1>
      <div className="h-[60%] w-[40%] flex justify-center items-center flex-col gap-5">
        <div className="w-max flex flex-col gap-5 items-center">
          <div className="relative">
            <img
              src="/logo/applogo.png"
              alt="Current avatar"
              className="h-52 w-52 rounded-full border-2 border-white object-cover"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              id="avatar-upload"
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <Label htmlFor="avatar-upload" className="text-xl">
            Avatar
          </Label>
        </div>
        <div className="w-1/2">
          <Label htmlFor="username">Username</Label>
          <Input
            placeholder="Xcalibur"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button
          className="bg-black border border-sky-400 text-sky-400"
          onClick={handleSet}
        >
          Set
        </Button>
      </div>
    </div>
  );
}
