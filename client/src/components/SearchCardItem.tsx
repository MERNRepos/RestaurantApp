import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Globe, MapPin } from "lucide-react";
import { AppBadge } from "./AppBadge";
import AppButton from "./AppButton";
import HereImage from "@/assets/hero_pizza.png";
import { Link } from "react-router-dom";
import type { Restaurant } from "@/types/restaurantType";

const SearchCardItem = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Card className="bg-white dark:bg-gray-400 shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <AspectRatio ratio={16 / 6}>
          <img src={HereImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 opacity-75 rounded-lg py-1 px-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured
            </span>
          </div>
        </AspectRatio>
      </div>
      <CardContent className="p-4">
        <div className="text-gray-900 dark:text-gray-100 font-bold text-2xl">
          {restaurant.restaurantName}
        </div>
        <div className="gap-1 mt-2 text-gray-600 dark:text-gray-400 flex items-center">
          <MapPin size={16} />
          <p className="text-sm">
            City: <span className="font-medium">{restaurant.city}</span>
          </p>
        </div>
        <div className="gap-1 mt-2 text-gray-600 dark:text-gray-400 flex items-center">
          <Globe size={16} />
          <p className="text-sm">
            Country: <span className="font-medium">{restaurant.country}</span>
          </p>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          {restaurant.cuisines.map((cuisine: string, idx: number) => (
            <AppBadge
              key={idx}
              name={cuisine}
              className="font-medium px-2 py-1 rounded-full shadow-sm text-white"
              variant="default"
            ></AppBadge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end ">
        <Link to={`/restaurant/${restaurant._id}`}>
          <AppButton
            className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200"
            title="View Menus"
            loading={false}
          ></AppButton>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SearchCardItem;
