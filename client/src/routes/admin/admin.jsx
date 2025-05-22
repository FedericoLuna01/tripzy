import { TabGroup, TabPanels } from "@headlessui/react";
import { Tab, TabList, TabPanel } from "../../components/ui/tabs/tabs";
import AdminUsers from "../../components/admin-users/admin-users";
import AdminTrips from "../../components/admin-trips/admin-trips";
import "./admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <TabGroup>
        <TabList>
          <Tab>Usuarios</Tab>
          <Tab>Viajes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminUsers />
          </TabPanel>
          <TabPanel>
            <AdminTrips />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Admin;
