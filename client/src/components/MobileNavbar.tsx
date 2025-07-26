import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  User,
  UtensilsCrossed,
} from "lucide-react";
import ThemeDropDown from "./ThemeDropDown";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useUserStore } from "@/store/useUserStore";

const MobileNavbar = () => {
  const { user, loading, logout } = useUserStore();

  return (
    <div className="md:hidden lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu
            size={18}
            className="bg-gray-200 hover:bg-gray-200 rounded-full text-black w-8 h-8"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex  flex-row justify-between items-center mt-10">
            <SheetTitle>Patel Eats</SheetTitle>
            <ThemeDropDown />
          </SheetHeader>
          <Separator className="my-2 mx-2" />

          <SheetDescription className="flex-1">
            <Link
              to="/profile"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              <span>Profile</span>
            </Link>
            <Link
              to="/order/status"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <HandPlatter />
              <span>Order</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <ShoppingCart />
              <span>Cart (0)</span>
            </Link>
            {user?.admin && (
              <>
                <Link
                  to="/admin/menu"
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                >
                  <SquareMenu />
                  <span>Menu</span>
                </Link>
                <Link
                  to="/admin/restaurant"
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                >
                  <UtensilsCrossed />
                  <span>Restaurant</span>
                </Link>
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                >
                  <PackageCheck />
                  <span>Restaurant Orders</span>
                </Link>
              </>
            )}
          </SheetDescription>

          <SheetFooter className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="font-bold">Patel Mernstack</h4>
            </div>
            <SheetClose asChild>
              {loading ? (
                <Button className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={logout}
                  className="bg-orange hover:bg-hoverOrange"
                >
                  Logout
                </Button>
              )}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
