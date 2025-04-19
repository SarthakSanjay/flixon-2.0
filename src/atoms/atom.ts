import { Season } from "@/types/show";
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

export const currentSeasonAtom = atom<Season>({
  _id: "",
  showId: "",
  number: 0,
});

export const contentTypeAtom = atom("movie");
