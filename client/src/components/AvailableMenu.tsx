import { food } from "@/assets/imageConstants";
import AppButton from "./AppButton";
import { CardContent, CardFooter } from "./ui/card";
import type { MenuItem } from "@/types/restaurantType";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="md:p-4">
      <div className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </div>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus.map((menu: MenuItem) => (
          <div className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden ">
            <img
              src={food ?? "menu.image"}
              alt=""
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{"menu.description"}</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <AppButton
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="w-full bg-orange hover:bg-hoverOrange"
                title="Add to Cart"
                loading={false}
              ></AppButton>
            </CardFooter>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
