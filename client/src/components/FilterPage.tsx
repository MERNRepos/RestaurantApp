import { Checkbox } from "@/components/ui/checkbox";
import AppButton from "./AppButton";
import { Label } from "@radix-ui/react-label";
import { useRestaurantStore } from "@/store/useRestaurantStore";

export type FilterOptionsState = {
  id: string;
  label: string;
};
// agar applied filter k andr ye item exixt krta hia toh iska mtlb checked hai
const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useRestaurantStore();

  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="md:w-52">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg">Filter by cuisines</div>
        <AppButton
          title="Reset"
          loading={false}
          variant="link"
          className="bg-white"
          onClick={resetAppliedFilter}
        />
      </div>
      {filterOptions.map((option, idx) => (
        <div key={idx} className="flex items-center space-x-2 my-5">
          <div className="flex items-center gap-3">
            <Checkbox
              id={option.id}
              checked={appliedFilter.includes(option.label)}
              onClick={() => appliedFilterHandler(option.label)}
            />
            <Label
              htmlFor={option.label}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
