import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "@/components/register-form";
import Logo from "@/components/app-logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh bg-black flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex items-center w-full max-w-sm flex-col gap-6">
        <Logo />
        <RegisterForm />
      </div>
    </div>
  );
}
