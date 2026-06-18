import { Grid, Header, Message, Segment, Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import AppInputField from '@/components/appInputField';
import AppButton from '@/components/appButton';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/userManagement/useLogin';
import { User } from '@/models/user';

const Login = () => {
  const { onNavigateToSignup, handleSubmit, onSubmit, handleChange, errors, register } = useLoginHandlers();

  return (
    <Grid textAlign='center' className='h-screen' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
            <AppInputField fluid icon='user' iconPosition='left' placeholder='Username' error={!!errors.username && errors.username?.message}
              {...register("username", {
                required: "username is required",
              })} onChange={handleChange} />
            <AppInputField
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              
              error={!!errors.password && errors.password?.message}
              {...register("password", { required: "Password is required" })} onChange={handleChange}
            />

            <AppButton type='submit' color='teal' fluid size='large'>
              Login
            </AppButton>
          </Segment>
        </Form>
        <Message onClick={onNavigateToSignup} style={{ cursor: "pointer" }}>
          New to us? Sign up
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login

const useLoginHandlers = () => {

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<User>();

  const { login } = useLogin();
  const navigate = useNavigate();

  const onNavigateToSignup = () => {
    navigate("/signup")
  }

  const onSubmit = async (data: User) => {
    await login("signin", data)
      .then(response => {
        if (response.status === 200) {
          reset();
          navigate('/', { replace: true });
        }
      }).catch(error => {
        console.error("error while Login", error)
      })
  };

  const handleChange = (e: any) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true })
  }
  return {
    onNavigateToSignup,
    onSubmit,
    handleSubmit,
    handleChange,
    register,
    errors,
  }
}