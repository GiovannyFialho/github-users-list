import ChangeLang from "@/app/components/ChangeLang";
import ChangeTheme from "@/app/components/ChangeTheme";
import Profile from "@/app/components/Profile";

export default function Header() {
  return (
    <header className="w-full h-auto sticky top-0 flex items-center justify-end gap-2 px-5 py-3">
      <ChangeLang />

      <ChangeTheme />

      <Profile />
    </header>
  );
}
