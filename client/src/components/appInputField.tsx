import React from "react";
import { FormInput, FormInputProps } from "semantic-ui-react";

interface AppInputFieldProps extends FormInputProps {
    label?: string;
}
const AppInputField = React.forwardRef<HTMLInputElement, AppInputFieldProps>(({ label, name, ...rest }, ref) => {
    return (
        <FormInput
            name={name}
            ref={ref}
            {...rest}
        />
    )
});

export default AppInputField;