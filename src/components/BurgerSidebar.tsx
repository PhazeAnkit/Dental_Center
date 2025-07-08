import {
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  IconButton,
  Card,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const BurgerSidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <IconButton
        {...({} as any)}
        variant="text"
        size="lg"
        onClick={toggleDrawer}
        className="md:hidden"
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </IconButton>

      {/* Drawer */}
      <Drawer {...({} as any)} open={isDrawerOpen} onClose={toggleDrawer}>
        <Card className="h-full w-full p-4" {...({} as any)}>
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h5" {...({} as any)}>
              ENTNT Admin
            </Typography>
            <IconButton {...({} as any)} variant="text" onClick={toggleDrawer}>
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          </div>
          <List {...({} as any)}>
            <ListItem onClick={() => handleNavigate("/admin")} {...({} as any)}>
              <ListItemPrefix {...({} as any)}>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
            <ListItem
              onClick={() => handleNavigate("/admin/patients")}
              {...({} as any)}
            >
              <ListItemPrefix {...({} as any)}>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Patients
            </ListItem>
            <ListItem
              onClick={() => handleNavigate("/admin/calendar")}
              {...({} as any)}
            >
              <ListItemPrefix {...({} as any)}>
                <CalendarDaysIcon className="h-5 w-5" />
              </ListItemPrefix>
              Calendar
            </ListItem>
            <ListItem
              onClick={() => {
                logout();
                navigate("/");
              }}
              {...({} as any)}
            >
              <ListItemPrefix {...({} as any)}>
                <PowerIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <span className="text-red-500">Logout</span>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
};
