import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserInfo } from '@/models/user';
import { useRegistration } from '@/hooks/userManagement/useRegistration';
import AppInputField from '@/components/appInputField';

const SignUp = () => {
    const {
        onNavigateToLogin,
        onSubmit,
        handleSubmit,
        errors,
        watch,
        handleChange,
        register,
        getValues,
    } = useSignupHandlers();

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='teal' textAlign='center'>
                    Sign up  your account
                </Header>
                <Form size='large' onSubmit={handleSubmit(onSubmit)}>
                    <Segment stacked>
                        <AppInputField fluid icon='user' iconPosition='left' placeholder='First Name' error={!!errors.firstName && errors.firstName?.message}
                            value={getValues("firstName")}
                            {...register("firstName", {
                                required: "First Name is required",
                            })} onChange={handleChange} />
                        <AppInputField fluid icon='user' iconPosition='left' placeholder='Last Name' error={!!errors.lastName && errors.lastName?.message}
                            value={getValues("lastName")}
                            {...register("lastName", {
                                required: "Last Name is required",
                            })} onChange={handleChange} />
                        <AppInputField fluid icon='user' iconPosition='left' placeholder='Username' error={!!errors.username && errors.username?.message}
                            value={getValues("username")}
                            {...register("username", {
                                required: "username is required",
                            })} onChange={handleChange} />
                        <AppInputField fluid icon='user' iconPosition='left' placeholder='Email Address' error={!!errors.email && errors.email?.message}
                            value={getValues("email")}
                            {...register("email", {
                                required: "Email Address is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })} onChange={handleChange} />
                        <AppInputField fluid icon='phone' iconPosition='left' placeholder='Phone Number'
                            value={getValues("phoneNumber")}
                            error={!!errors.phoneNumber && errors.phoneNumber?.message}
                            {...register("phoneNumber", {
                                required: "Phone Number is required",
                                pattern: {
                                    value: /^!*(\d!*){10,}$/,
                                    message: "invalid email address"
                                }
                            })} onChange={handleChange} />
                        <AppInputField
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={getValues("password")}
                            error={!!errors.password && errors.password?.message}
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    message: "Password must be at least 6 characters, include one uppercase letter and one special character."
                                }
                            })} onChange={handleChange}
                        />
                        <AppInputField
                            fluid
                            icon='lock'

                            iconPosition='left'
                            placeholder='Confirm Password'
                            type='password'
                            value={getValues("confirmPassword")}
                            error={!!errors.confirmPassword && errors.confirmPassword?.message}
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: value => value === watch('password') || "Passwords do not match"
                            })} onChange={handleChange}
                        />

                        <Button type='submit' color='teal' fluid size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message onClick={onNavigateToLogin} style={{ cursor: "pointer" }}>
                    Already Registered? Login
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default SignUp

const useSignupHandlers = () => {

    const defaultFormValue = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        roles: [],
        username: '',
    }

    const { register, watch, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm<UserInfo>({
        defaultValues: defaultFormValue
    });

    const navigate = useNavigate();
    const { userRegistration } = useRegistration();

    const onNavigateToLogin = () => {
        navigate("/login")
    }

    const handleChange = (e: any) => {
        setValue(e.target.name, e.target.value, { shouldValidate: true })
    }

    const onSubmit = async (data: UserInfo) => {
        delete data["roles"]
        await userRegistration("signup", data)
            .then(response => {
                if (response.status === 200) {
                    reset(defaultFormValue);
                }
            }).catch(error => {
                console.error("error while Login", error)
            })
    };
    return {
        onNavigateToLogin,
        onSubmit,
        handleSubmit,
        errors,
        handleChange,
        watch,
        register,
        getValues
    }
}