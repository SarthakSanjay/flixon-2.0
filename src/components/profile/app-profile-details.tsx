"use client";
import useProfile from "@/hooks/use-profile";
import { ProfileProps, User } from "@/types/user";
import { useEffect, useState } from "react";
import Loading from "../loading";
import useUser from "@/hooks/use-user";
import { formatDate } from "@/utils";

export default function ProfileDetails() {
  const [profileData, setProfileData] = useState<ProfileProps | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { getProfileById, loading } = useProfile();
  const { getUser } = useUser();
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

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const res = await getUser(userId);
        if (res) {
          console.log(res);
          setUser(res.user);
        }
      }
    };
    fetchUser();
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

        <div className="h-[90%] w-full flex">
          <div className="border h-full w-[30%] flex flex-col justify-start items-center gap-5 py-10">
            <div className="h-28 w-28 rounded-full">
              <img
                className="h-full w-full rounded-full object-cover object-center"
                src={profileData?.avatar}
              />
            </div>
            <h1 className="text-xl">{profileData?.name}</h1>
            <div>{user?.email}</div>
            <div>Joined on: {user && formatDate(user?.createdAt)}</div>
          </div>

          <div className="h-full w-[70%] border border-red-50 p-10 flex gap-10">
            {["Watchlist", "Favorite", "Liked"].map((type, index) => {
              return <Category type={type} total={(index + 1) * 10} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Category({ total, type }: { total: number; type: string }) {
  return (
    <div className="h-32 w-64 border rounded-lg flex justify-center items-center flex-col gap-2">
      <div className="text-xl font-bold">{total}</div>
      <div className="text-lg">{type}</div>
    </div>
  );
}
