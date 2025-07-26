import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const AppButton = ({
  loading,
  title,
  className,
  variant = "default",
  children,
  onClick,
}: {
  loading: boolean;
  title: string;
  className?: string;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  children?: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div>
      {loading ? (
        <Button
          className={`bg-orange hover:bg-hoverorange ${className}`}
          variant={variant}
        >
          <Loader2 className="animate-spin h-4 w-4 " />
          Please wait
        </Button>
      ) : (
        <Button
          className={`bg-orange hover:bg-hoverorange ${className}`}
          variant={variant}
          onClick={onClick}
        >
          {title}
          {children}
        </Button>
      )}
    </div>
  );
};

export default AppButton;
