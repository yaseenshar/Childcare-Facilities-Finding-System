import { ButtonGroup, ButtonOr, Form, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import AppInputField from '@/components/appInputField';
import { Profile } from '@/models/profile';
import AppButton from '@/components/appButton';
import { useDeleteProfile, useGetProfile, useUpdateProfile } from '@/hooks/profileManagement/useProfile';
import { useEffect } from 'react';
import { getLocalUserInfo } from '@/helpers/localstorage';
import { checkIsPowerUser } from '@/helpers/permissions';

const UserProfile = () => {
    const {
        getValues,
        onSubmit,
        handleSubmit,
        handleDelete,
        errors,
        handleChange,
        register,
        addressFields,
        appendAddress,
        removeAddress,
        profileData,
        isPowerUser,
    } = useProfileHandlers();

    console.log(isPowerUser());

    return (
        <Grid textAlign='center' style={{ height: '100vh', minWidth: '90%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 1050 }} >
                <Header as='h1' color='teal' textAlign='center'>
                    USER PROFILE
                </Header>
                <Form size='large' onSubmit={handleSubmit(onSubmit)}>
                    <Segment stacked>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <AppInputField fluid icon='user' iconPosition='left' placeholder='First Name' error={!!errors.firstName && errors.firstName?.message}
                                        value={getValues("firstName")}
                                        {...register("firstName", {
                                            required: "First Name is required",
                                        })} onChange={handleChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <AppInputField fluid icon='user' iconPosition='left' placeholder='Last Name' error={!!errors.lastName && errors.lastName?.message}
                                        value={getValues("lastName")}
                                        {...register("lastName", {
                                            required: "Last Name is required",
                                        })} onChange={handleChange} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <AppInputField fluid icon='user' iconPosition='left' placeholder='Username' error={!!errors.username && errors.username?.message}
                                        value={getValues("username")}
                                        {...register("username", {
                                            required: "username is required",
                                        })} onChange={handleChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <AppInputField fluid icon='user' iconPosition='left' placeholder='Email Address' error={!!errors.email && errors.email?.message}
                                        value={getValues("email")}
                                        {...register("email", {
                                            required: "Email Address is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "invalid email address"
                                            }
                                        })} onChange={handleChange} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <AppInputField fluid icon='phone' iconPosition='left' placeholder='Phone Number'
                                        value={getValues("phoneNumber")}
                                        error={!!errors.phoneNumber && errors.phoneNumber?.message}
                                        {...register("phoneNumber", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^!*(\d!*){10,}$/,
                                                message: "invalid phone number"
                                            }
                                        })} onChange={handleChange} />
                                </Grid.Column>
                                <Grid.Column className='!flex !justify-start'>
                                    <span>
                                        <span className='mr-4'>
                                            ROLE:
                                        </span>
                                        <Label className='ml-4' color={"teal"}>
                                            {profileData && profileData.roles && profileData.roles[0]?.name === "USER" ? "USER" : "POWER USER"}
                                        </Label>
                                    </span>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Segment.Group className='pb-4'>
                            {isPowerUser() &&
                                <Grid>
                                    <Grid.Row columns={1}>
                                        <Grid.Column className='!flex !justify-end'>
                                            <AppButton className='!my-4 align-left' type='button' color='teal' onClick={() => appendAddress({ country: '', city: '', streetAddress: '' })}>
                                                Add Address
                                            </AppButton>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            }
                            {addressFields.map((item, index) => (
                                <Grid key={item.id}>
                                    <Grid.Row columns={4}>
                                        <Grid.Column>
                                            <AppInputField
                                                fluid
                                                icon='home'
                                                iconPosition='left'
                                                placeholder='Street Address'
                                                value={getValues(`addresses[${index}].streetAddress` as keyof Profile)}
                                                error={errors.addresses?.[index]?.streetAddress?.message}
                                                {...register(`addresses[${index}].streetAddress` as keyof Profile, {
                                                    required: "Street Address is required",
                                                })}
                                                onChange={handleChange}
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <AppInputField
                                                fluid
                                                icon='building'
                                                iconPosition='left'
                                                placeholder='City'
                                                value={getValues(`addresses[${index}].city` as keyof Profile)}
                                                error={errors?.addresses?.[index]?.city?.message}
                                                {...register(`addresses[${index}].city` as keyof Profile, {
                                                    required: "City is required",
                                                })}
                                                onChange={handleChange}
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <AppInputField
                                                fluid
                                                icon='globe'
                                                iconPosition='left'
                                                placeholder='Country'
                                                value={getValues(`addresses[${index}].country` as keyof Profile)}
                                                error={errors?.addresses?.[index]?.country?.message}
                                                {...register(`addresses[${index}].country` as keyof Profile, {
                                                    required: "Country is required",
                                                })}
                                                onChange={handleChange}
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <AppButton type='button' basic color='red' size='large' onClick={() => removeAddress(index)}>
                                                <Icon name='delete' />
                                                Remove
                                            </AppButton>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            ))}
                        </Segment.Group>
                        <Grid.Row columns={1}>
                            <Grid.Column className='!flex !justify-end'>
                                <ButtonGroup>
                                    <AppButton type='button' color='red' onClick={handleDelete}>Delete Profile</AppButton>
                                    <ButtonOr />
                                    <AppButton type='submit' color='teal'>Save Profile</AppButton>
                                </ButtonGroup>
                            </Grid.Column>

                        </Grid.Row>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default UserProfile

const useProfileHandlers = () => {
    const navigate = useNavigate();

    const { data: profileData, getProfileById } = useGetProfile(false);
    const user = getLocalUserInfo();

    const { updateProfile } = useUpdateProfile();
    const { deleteProfile } = useDeleteProfile();

    const defaultFormValue = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        roles: [],
        username: '',
        addresses: [{ country: '', city: '', streetAddress: '' }]
    }

    const { register, control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm<Profile>({
        defaultValues: defaultFormValue
    });

    const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
        control,
        name: "addresses"
    });

    useEffect(() => {

        reset(profileData);
    }, [profileData]);


    const onNavigateToLogin = () => {
        navigate("/login")
    }

    const handleChange = (e: any) => {
        setValue(e.target.name, e.target.value, { shouldValidate: true })
    }

    const handleDelete = async () => {
        await deleteProfile("profile")
            .then(response => {

            }).catch(error => {
                console.error("error while Login", error)
            })
    }

    const onSubmit = async (data: Profile) => {
        delete data["roles"]
        await updateProfile("profile", data)
            .then(response => {
                if (response.status === 200) {
                    getProfileById("profile", user.id);
                    reset();
                }
            }).catch(error => {
                console.error("error while Login", error)
            })
    };
    const isPowerUser = () => {
        return checkIsPowerUser(user)
    }

    return {
        onNavigateToLogin,
        onSubmit,
        handleSubmit,
        errors,
        handleChange,
        handleDelete,
        register,
        getValues,
        addressFields,
        appendAddress,
        removeAddress,
        profileData,
        isPowerUser
    }
}