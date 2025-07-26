import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="justify-center items-center text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NoResultFound;
