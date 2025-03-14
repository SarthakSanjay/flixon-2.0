"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useProfile from "@/hooks/use-profile";
import { ProfileProps } from "@/types/user";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { profileAtom } from "@/atoms/atom";
import Loading from "../loading";

export default function Profile() {
  const [profiles, setProfiles] = useState<ProfileProps[] | []>([]);
  const { getUserProfiles, loading, error } = useProfile();
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await getUserProfiles("67cee6bc6566ff7357a3d110");
      if (data) {
        setProfiles(data.profiles);
      }
    };
    fetchProfiles();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!profiles) {
    router.push("/profile/create");
  }
  return (
    <div className="h-screen w-screen bg-black flex flex-col justify-start items-center relative p-10 gap-20">
      <h1 className="text-2xl h-20 flex items-center">Who is Watching?</h1>
      <div className="h-max py-10 border-0 border-sky-400 w-2/3 flex flex-row flex-wrap justify-center items-center gap-10 ">
        {profiles.map((profile) => {
          return <ProfileCard key={profile._id} profile={profile} />;
        })}
        <CreateProfileBtn />
      </div>
    </div>
  );
}

function ProfileCard({ profile }: { profile: ProfileProps }) {
  const router = useRouter();
  const [_, setUserProfile] = useAtom(profileAtom);
  const handleClick = () => {
    setUserProfile({
      id: profile._id,
      userId: "67cee6bc6566ff7357a3d110",
    });

    localStorage.setItem("profileId", profile._id);

    router.push("/");
  };
  return (
    <div
      className="h-32 w-32 border-0 border-white rounded-lg p-2 flex flex-col items-center cursor-pointer hover:scale-105 transition-all ease-in-out"
      onClick={handleClick}
    >
      <div className="h-24 w-24 rounded-lg">
        <img
          src={profile.avatar}
          className="w-24 h-24 rounded-lg object-cover border border-white"
        />
      </div>
      <h1 className="text-lg">{profile.name}</h1>
    </div>
  );
}

function CreateProfileBtn() {
  const router = useRouter();
  return (
    <Button
      className="h-24 w-24 border border-white rounded-lg flex flex-col gap-2 hover:border-sky-400 hover:text-sky-400 mb-4"
      onClick={() => router.push("/profile/create")}
    >
      <Plus />
      <h1>Add</h1>
    </Button>
  );
}
