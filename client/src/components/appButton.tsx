import { Button, ButtonProps } from "semantic-ui-react";

interface AppButtonProps extends ButtonProps {
    children?: React.ReactNode;
}
const AppButton: React.FC<AppButtonProps> = ({ children, ...rest }) => {
    return (
        <Button
            {...rest}
        >
        {children}
        </Button>
    )
}

export default AppButton;