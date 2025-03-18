import { atom } from "jotai";

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
