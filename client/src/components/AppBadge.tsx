import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function AppBadge({
  name,
  className,
  variant = "outline",
  showClose = false,
  onClickX,
}: {
  name: string;
  className?: string;
  variant?:
    | "outline"
    | "default"
    | "secondary"
    | "destructive"
    | null
    | undefined;
  showClose?: boolean;
  onClickX: () => void;
}) {
  return (
    <Badge
      className={`text-[#D19254] rounded-md hover:cursor-pointer pr-1 whitespace-nowrap ${className} `}
      variant={variant}
    >
      {name}
      {showClose && (
        <X
          size={16}
          className="cursor-pointer text-[#D19254] right-1"
          onClick={onClickX}
        />
      )}
    </Badge>
  );
}
