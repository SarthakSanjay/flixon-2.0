"use client";
import useProfile from "@/hooks/use-profile";
import { ProfileProps } from "@/types/user";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/atom";

export default function ProfileDetails() {
  const [profileData, setProfileData] = useState<ProfileProps | null>(null);
  const { getProfileById, loading } = useProfile();
  const user = useAtomValue(userAtom);
  useEffect(() => {
    const fetchProfile = async () => {
      const profileId = localStorage.getItem("profileId");
      if (profileId) {
        const res = await getProfileById(profileId);
        if (res) {
          setProfileData(res.profile);
        }
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-black h-screen w-screen px-10  flex justify-center items-center">
      <div className="h-[80%] w-[90%] bg-gray-800 rounded-xl">
        <h1 className="h-[10%] w-full text-xl px-10 border flex items-center">
          Profile Details
        </h1>

        <div className="h-[90%] w-full">
          <div className="border h-full w-[30%] flex flex-col justify-start items-center gap-5 py-10">
            <div className="h-28 w-28 rounded-full">
              <img
                className="h-full w-full rounded-full object-cover object-center"
                src={profileData?.avatar}
              />
            </div>
            <h1 className="text-xl">{profileData?.name}</h1>
            <div>{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
