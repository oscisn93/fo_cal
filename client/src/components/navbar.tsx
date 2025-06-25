import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

export interface NavbarItem {
  text: string;
  link: string;
  iconURL: any;
}

export interface NavbarProps {
  children?: any,
  items: NavbarItem[];
}

export default function Navbar(props: NavbarProps) {
  return (
    <NavigationMenu className="w-[600px] items-between justify-between">
      <NavigationMenuList>
        {props.items.map(item => (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                  <img src={item.iconURL} />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <a href={item.link}>
                    {item.text}
                  </a>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
      <NavigationMenuItem>
        {props.children}
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
