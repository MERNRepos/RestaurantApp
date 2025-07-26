import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

export const AppMenubar = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link to={"/admin/restaurant"}>Restaurant</Link>{" "}
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>

          <MenubarItem>
            <Link to={"/admin/menu"}>Menu</Link>{" "}
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>

          <MenubarItem>
            <Link to={"/admin/orders"}>Order</Link>{" "}
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
