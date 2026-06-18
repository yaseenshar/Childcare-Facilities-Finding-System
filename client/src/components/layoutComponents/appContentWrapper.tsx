
interface AppContentWrapperProps {
    children?: React.ReactNode;  // `children` is optional, remove '?' if required
}


const AppContentWrapper: React.FC<AppContentWrapperProps> = ({ children }) => {
    return (
        <div className="pusher">
            <div className="main-content">
                {children}
            </div>
        </div>
    );
}

export default AppContentWrapper;