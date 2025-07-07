import { createContext, useContext, useState, type ReactNode } from "react";


interface SidebarContextType {
  isOpen: boolean;
  collapsed: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  collapsed: false,
  toggleSidebar: () => {},
  toggleCollapse: () => {},
  closeSidebar: () => {},
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleCollapse = () => setCollapsed((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen, collapsed, toggleSidebar, toggleCollapse, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
