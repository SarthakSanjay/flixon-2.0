import { atom } from "jotai";
import { IdCard } from "lucide-react";

interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  userId: string;
}

export const userAtom = atom<User>({
  id: "",
  email: "",
});

export const profileAtom = atom<Profile>({
  id: "",
  userId: "",
});
