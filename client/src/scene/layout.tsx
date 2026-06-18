import AppContentWrapper from "@/components/layoutComponents/appContentWrapper";
import AppNavbar from "@/components/layoutComponents/appNavbar";

interface LayoutProps {
    children?: React.ReactNode;  // `children` is optional, remove '?' if required
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <AppNavbar />
            <AppContentWrapper>
                {children}
            </AppContentWrapper>
        </>
    );
}

export default Layout;