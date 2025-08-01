import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { type CartItem } from "@/types/cartType";
import { useCartStore } from "@/store/useCartStore";

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    getOrderDetails().then(() => {
      clearCart();
    });
  }, []);

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status:{" "}
            <span className="text-[#FF5A5A]">{"confirm".toUpperCase()}</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </div>
          {/* Your Ordered Item Display here  */}
          {orders.map((order: any, index: number) => (
            <div key={index}>
              {order.cartItems.map((item: CartItem) => (
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt=""
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-800 dark:text-gray-200 flex items-center">
                        <IndianRupee />
                        <span className="text-lg font-medium">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <Link to="/cart">
          <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
