import { Link } from "react-router-dom";
import { AppMenubar } from "../components/AppMenubar";
import { ModeToggle } from "./ModeToggle";
import MobileNavbar from "./MobileNavbar";
import { useUserStore } from "@/store/useUserStore";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="justify-between flex items-center h-24">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold md:font-extrabold">
            Alchemy Kitchen
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/order/status"}>Order</Link>
          </div>
          {user?.admin && <AppMenubar />}
          <ModeToggle />
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
