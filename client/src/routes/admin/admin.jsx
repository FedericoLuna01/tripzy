import { TabGroup, TabPanels } from "@headlessui/react";
import { Tab, TabList, TabPanel } from "../../components/ui/tabs/tabs";
import AdminUsers from "../../components/admin-users/admin-users";
import AdminTrips from "../../components/admin-trips/admin-trips";
import AdminMessages from "../admin-messages/admin-messages";
import "./admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <TabGroup>
        <TabList>
          <Tab>Usuarios</Tab>
          <Tab>Viajes</Tab>
          <Tab>Mensajes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminUsers />
          </TabPanel>
          <TabPanel>
            <AdminTrips />
          </TabPanel>
          <TabPanel>
            <AdminMessages />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Admin;
