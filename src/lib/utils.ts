import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import api from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function logout() {
  try {
    const response = await api.post(
      "/api/user/logout",
      {},
      { withCredentials: true },
    );

    if (response.status > 200) {
      throw new Error("Logout failed");
    }

    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export const items = [
  // {
  //   "name": "Fantastic 4",
  //   "url": "https://i.ytimg.com/vi/AzMo-FgRp64/maxresdefault.jpg"
  // },
  // {
  //   "name": "Thunderbolts*",
  //   "url": "https://i.ytimg.com/vi/v-94Snw-H4o/maxresdefault.jpg"
  // },
  {
    name: "Captain America Brave New World",
    url: "https://comicbook.com/wp-content/uploads/sites/4/2025/01/Captain-America-Brave-New-World-cover-image.jpg",
    textImg: "/text/captainamericabnw.webp",
  },
  {
    name: "The Amazing Spiderman",
    url: "/thumbnail/theamazingspiderman.jpg",
    textImg: "/text/tasm.webp",
  },
  {
    name: "Avengers Infinity War",
    url: "/thumbnail/avengersinfinitywar.jpg",
    textImg: "/text/avengersinfinitywar.png",
  },
  {
    name: "F1",
    url: "/thumbnail/f1.jpg",
    textImg: "/text/f1.png",
  },
  {
    name: "The Batman",
    url: "/thumbnail/thebatman.jpg",
    textImg: "/text/thebatman.png",
  },
  {
    name: "John Wick",
    url: "/thumbnail/johnwick.jpg",
    textImg: "/text/jhonwick.png",
  },
  {
    name: "Avengers Endgame",
    url: "/thumbnail/avengersendgame.jpg",
    textImg: "/text/avengersendgame.png",
  },
];
