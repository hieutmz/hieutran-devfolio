"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextProps {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<ContextProps>({
	sidebarOpen: false,
	setSidebarOpen: (): boolean => false,
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
	return (
		<AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>{children}</AppContext.Provider>
	);
};

export const useAppProvider = () => useContext(AppContext);
export default AppProvider;
