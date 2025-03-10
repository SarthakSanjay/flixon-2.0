"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useUser from "@/hooks/use-user";
import { ProfileProps } from "@/types/user";
import CreateProfile from "./app-create-profile";

export default function Profile() {
  const [profiles, setProfiles] = useState<ProfileProps[] | []>([]);
  const { getUserProfiles, createUserProfile, loading, error } = useUser();

  console.log("profiles", profiles);

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await getUserProfiles("67cee6bc6566ff7357a3d110");
      if (data) {
        setProfiles(data.profiles);
      }
    };
    fetchProfiles();
  }, []);

  if (profiles.length === 0) {
    return <CreateProfile />;
  }
  return (
    <div className="h-screen w-screen bg-black flex flex-col justify-start items-center relative p-10 gap-20">
      <h1 className="text-2xl h-20 flex items-center">Who is Watching?</h1>
      <div className="h-max py-10 border border-sky-400 w-1/2 flex flex-col justify-center items-center gap-10 ">
        <div
          className="h-[90%] w-full flex flex-col items-center 
          overflow-y-scroll overflow-x-hidden gap-5 border border-red-500"
        >
          {profiles.map((profile) => {
            return <ProfileCard profile={profile} />;
          })}
        </div>
        <CreateProfileBtn />
      </div>
    </div>
  );
}

function ProfileCard({ profile }: { profile: ProfileProps }) {
  return (
    <div className="h-28 w-80 border border-white rounded-lg p-2 flex">
      <div className="h-24 w-24 rounded-lg">
        <img
          // src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
          src={profile.avatar}
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="h-24 w-56 p-2">
        <h1 className="text-xl">{profile.name}</h1>
        <div className="flex flex-col">
          <div className="text-gray-600">Last Logined</div>
          <div className="text-gray-500">11 march 2025</div>
        </div>
      </div>
    </div>
  );
}

function CreateProfileBtn() {
  return (
    <Button className="h-24 w-24 border border-white rounded-lg flex flex-col gap-2 hover:border-sky-400 hover:text-sky-400">
      <Plus />
      <h1>Add</h1>
    </Button>
  );
}
