import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "@/components/register-form";
import Logo from "@/components/app-logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh bg-black flex-col items-center justify-center gap-6 p-6 md:p-10 relative">
      <img
        src="./background.jpg"
        className="h-full w-full absolute top-0 left-0 z-0"
      />
      <div className="h-full w-full absolute top-0 left-0 z-10 bg-black/70"></div>
      <div className="flex items-center w-full max-w-sm flex-col gap-6 z-20">
        <Logo />
        <RegisterForm />
      </div>
    </div>
  );
}
