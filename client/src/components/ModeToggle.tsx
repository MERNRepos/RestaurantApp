import ThemeDropDown from "./ThemeDropDown";
import AppAvatar from "./AppAvatar";
import CartNotificationButton from "./CartNotificationButton";
import AppButton from "./AppButton";
import { useUserStore } from "@/store/useUserStore";

export function ModeToggle() {
  const { loading, logout } = useUserStore();

  return (
    <div className="flex items-center gap-4">
      <ThemeDropDown />
      <CartNotificationButton />
      <AppAvatar />
      <AppButton title={"Logout"} loading={loading} onClick={logout} />
    </div>
  );
}
