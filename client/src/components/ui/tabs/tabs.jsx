import {
  Tab as TabPrimitive,
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
} from "@headlessui/react";
import styles from "./tabs.module.css";

export function Tab({ children, ...props }) {
  return (
    <TabPrimitive
      className={({ selected }) =>
        `${styles.tab} ${selected ? styles["tab-selected"] : ""}`
      }
      {...props}
    >
      {children}
    </TabPrimitive>
  );
}
export function TabList({ children, className, ...props }) {
  return (
    <TabListPrimitive
      className={`${styles["tabs-container"]} card ${className ? className : ""}`}
      {...props}
    >
      {children}
    </TabListPrimitive>
  );
}

export function TabPanel({ children, ...props }) {
  return (
    <TabPanelPrimitive className={styles["tab-panel"]} {...props}>
      {children}
    </TabPanelPrimitive>
  );
}
