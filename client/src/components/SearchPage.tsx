import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import AppButton from "./AppButton";
import { AppBadge } from "./AppBadge";
import SearchCardItem from "./SearchCardItem";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import type { Restaurant } from "@/types/restaurantType";
import SearchPageSkeleton from "./SearchPageSkeleton";
import NoResultFound from "./NoResultFound";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
    setAppliedFilter,
    appliedFilter,
  } = useRestaurantStore();

  useEffect(() => {
    searchRestaurant(params.text!, searchQuery, appliedFilter);
  }, [params.text!, appliedFilter]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search by restaurant & cuisines"
            />
            <AppButton
              title={"Search"}
              loading={false}
              onClick={() =>
                searchRestaurant(params.text!, searchQuery, appliedFilter)
              }
            />
          </div>
          {/* Searched Items display here  */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <div className="font-medium text-lg">
                ({searchedRestaurant?.data.length}) Search result found
              </div>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                <div
                  className={`relative inline-flex items-center max-w-full `}
                >
                  {appliedFilter.map((selectedFilter: string, idx: number) => (
                    <AppBadge
                      name={selectedFilter}
                      key={idx}
                      showClose={true}
                      className="mr-2"
                      onClickX={() => setAppliedFilter(selectedFilter)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Restaurants card */}
            {loading ? (
              <SearchPageSkeleton />
            ) : !loading && searchedRestaurant?.data.length === 0 ? (
              <div className="gap-4 justify-center items-center pt-25">
                <NoResultFound searchText={params.text!} />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {searchedRestaurant?.data.map((restaurant: Restaurant) => (
                  <SearchCardItem restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
