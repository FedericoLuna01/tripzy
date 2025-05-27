import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItems as HeadlessMenuItems,
  MenuItem as HeadlessMenuItem,
} from "@headlessui/react";
import "./menu.css";

export const Menu = ({ children, ...props }) => {
  return (
    <HeadlessMenu className="menu" as={"div"} {...props}>
      <>{children}</>
    </HeadlessMenu>
  );
};

export const MenuButton = ({ children, className, ...props }) => {
  return (
    <HeadlessMenuButton {...props} className={`menu-button ${className}`}>
      {children}
    </HeadlessMenuButton>
  );
};
export const MenuItems = ({ children, className, ...props }) => {
  return (
    <HeadlessMenuItems
      transition
      {...props}
      className={`menu-items shadow ${className}`}
    >
      {children}
    </HeadlessMenuItems>
  );
};
export const MenuItem = ({ children, className, ...props }) => {
  return (
    <HeadlessMenuItem
      as={"div"}
      {...props}
      className={`menu-item  ${className}`}
    >
      {children}
    </HeadlessMenuItem>
  );
};
