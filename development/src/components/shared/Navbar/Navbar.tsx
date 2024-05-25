import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { setThemeStateAction } from "@/store/Services/Theme";
import { ThemeOptions, themeTypesCustome } from "@/types/types";

type Props = {};

const Navbar = (props: Props) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.themecontrols);

  // for theme
  const handleTheme = (selectedTheme: themeTypesCustome) => {
    dispatch(
      setThemeStateAction({
        newValue: selectedTheme === "light" ? "dark" : "light",
      })
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleTheme(ThemeOptions.light)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleTheme(ThemeOptions.dark)}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleTheme(ThemeOptions.system)}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
