import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/useUserStore";

const AppAvatar = ({ className }: { className?: string }) => {
  const { user } = useUserStore();
  return (
    <div>
      <Avatar className={className}>
        <AvatarImage
          src={user?.profilePicture ?? "https://github.com/shadcn.png"}
          className=""
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AppAvatar;
