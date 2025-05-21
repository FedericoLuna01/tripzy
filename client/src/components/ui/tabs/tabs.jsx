import {
  Tab as TabPrimitive,
  TabList as TabListPrimitive,
} from "@headlessui/react";
import "./tabs.css";

export function Tab({ children, ...props }) {
  return (
    <TabPrimitive
      className={({ selected }) => `tab ${selected ? "tab-selected" : ""}`}
      {...props}
    >
      {children}
    </TabPrimitive>
  );
}
export function TabList({ children, ...props }) {
  return (
    <TabListPrimitive className="tabs-container card" {...props}>
      {children}
    </TabListPrimitive>
  );
}
