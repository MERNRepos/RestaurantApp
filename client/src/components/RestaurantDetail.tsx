import { useParams } from "react-router-dom";
import { AppBadge } from "./AppBadge";
import { Timer } from "lucide-react";
import { useEffect } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import AvailableMenu from "./AvailableMenu";

const RestaurantDetail = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();
  console.log("singleRestaurant", singleRestaurant, params.id);

  useEffect(() => {
    fetchRestaurant();
  }, [params.id]);

  const fetchRestaurant = () => {
    getSingleRestaurant(params.id!);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant?.imageUrl || "Loading..."}
            alt="res_image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <div className="font-medium text-xl">Tanduri Tadka</div>
            <div className="flex gap-2 my-2">
              {singleRestaurant?.cuisines.map(
                (cuisine: string, idx: number) => (
                  <AppBadge
                    key={idx}
                    name={cuisine}
                    className="font-medium px-2 py-1 rounded-full shadow-sm text-white"
                    variant="default"
                  ></AppBadge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <div className="flex items-center gap-2 font-medium">
                  Delivery Time:{" "}
                  <span className="text-[#D19254]">
                    {singleRestaurant?.deliveryTime || "NA"} mins
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {singleRestaurant?.menus && (
          <AvailableMenu menus={singleRestaurant?.menus} />
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
