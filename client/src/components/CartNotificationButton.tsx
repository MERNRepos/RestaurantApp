import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/useCartStore";

const CartNotificationButton = () => {
  const { cart } = useCartStore();
  return (
    <Link to={"/cart"} className="cursor-pointer relative">
      <ShoppingCart className="text-black" />
      {cart.length > 0 && (
        <Button
          size={"icon"}
          className="absolute -inset-y-3 left-2 rounded-full w-5 h-5 text-xs bg-red-500 hover:bg-red-500"
        >
          {cart.length}
        </Button>
      )}
    </Link>
  );
};

export default CartNotificationButton;
