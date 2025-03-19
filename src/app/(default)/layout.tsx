import AppLayoutTemplate from "@/src/components/shared/templates/AppLayoutTemplate";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
	return <AppLayoutTemplate>{children}</AppLayoutTemplate>;
};
export default DefaultLayout;
