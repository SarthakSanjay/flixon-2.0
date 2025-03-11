"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn, logout } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "@/hooks/use-user";
import { ProfileProps } from "@/types/user";
import { useAtom } from "jotai";
import { profileAtom } from "@/atoms/atom";
import { Input } from "../ui/input";
import { Check, X } from "lucide-react";

export default function ProfileDropdown() {
  const router = useRouter();
  const { getProfileById, loading, error } = useUser();
  const [userProfile, setUserProfile] = useState<ProfileProps | null>(null);
  const [profile] = useAtom(profileAtom);

  useEffect(() => {
    console.log(profile.id);
    const fetchProfile = async () => {
      if (profile) {
        if (!profile.id) {
          profile.id = localStorage.getItem("profileId") as string;
        }
        const data = await getProfileById(profile?.id);
        if (data) {
          setUserProfile(data.profile);
        }
      }
    };
    fetchProfile();
  }, []);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" border-0 border-white rounded-full  h-max w-max m-2">
        <Avatar>
          <AvatarImage
            src={userProfile?.avatar}
            className="object-center object-cover"
          />
          <AvatarFallback>{userProfile?.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-96 w-80 border-0 bg-black/70 flex flex-col items-center justify-center gap-3">
        <div className="h-28 w-28 rounded-full border border-white">
          <img
            className="h-full w-full object-cover object-center rounded-full"
            src={userProfile?.avatar}
          />
        </div>
        <EditProfile userProfile={userProfile} />
        <Button
          className="border border-sky-500 text-sky-500"
          onClick={() => router.push("/profile")}
        >
          Switch Profile
        </Button>
        <Button onClick={handleLogout} variant={"destructive"}>
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EditProfile({ userProfile }: { userProfile: ProfileProps | null }) {
  const [edit, setEdit] = useState(false);
  const { updateUserProfile } = useUser();
  const [username, setUsername] = useState("");

  const handleSave = async () => {
    if (!username) {
      alert("username is empty");
      return;
    }
    await updateUserProfile(userProfile?._id, {
      name: username,
    });

    setEdit(false);
  };
  return (
    <div className="flex items-center gap-3">
      {edit ? (
        <Input
          className={cn([
            "text-white",
            username === "" ? "border-red-500" : "border-green-500",
          ])}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      ) : (
        <h1 className="text-xl text-white">{userProfile?.name}</h1>
      )}
      {edit ? (
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            <Check />
          </Button>
          <Button onClick={() => setEdit(false)}>
            <X />
          </Button>
        </div>
      ) : (
        <Button onClick={() => setEdit(true)}>Edit</Button>
      )}
    </div>
  );
}
