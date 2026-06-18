import { useAuth } from "@/AuthenticationContext/authContext";
import appLogo from "@/assets/logo.png";
import { getLocalUserInfo } from "@/helpers/localstorage";
import { checkIsPowerUser } from "@/helpers/permissions";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu } from "semantic-ui-react";


const AppNavbar = () => {

    const userInfo = getLocalUserInfo();

    const trigger = (<span><i className="user cirlce icon"></i> {userInfo.username}</span>)


    const {
        handleNavToProfile,
        handleNavToHome,
        handleNavToUsersInfo,
        handleSignout,
        pathname,
    } = useNavBarHandlers();

    return (
        <nav className="ui top fixed inverted menu primary-900 h-20">
            <div className="left menu">
                <div className="header item flex justify-center items-center">
                    <img src={appLogo} alt="Not-Found" className="h-10" />&nbsp;&nbsp;Childcare Facilities System
                </div>
            </div>

            <div className="right menu">
                <div className="ui dropdown item">
                    <Dropdown trigger={trigger}>
                        <DropdownMenu>
                            <DropdownItem disabled icon='user' text={`Signed in as ${userInfo.username}`} />
                            {pathname !== "/" &&
                                <>
                                    <DropdownDivider />
                                    <DropdownItem icon='home' text='Home' onClick={handleNavToHome} />
                                </>
                            }
                            {pathname !== "/users-info" && checkIsPowerUser(userInfo) &&
                                <>
                                    <DropdownDivider />
                                    <DropdownItem icon='users' text='Users Info' onClick={handleNavToUsersInfo} />
                                </>
                            }
                            {pathname !== "/user-profile" &&
                                <>
                                    <DropdownDivider />
                                    <DropdownItem icon='user' text='Your Profile' onClick={handleNavToProfile} />
                                </>
                            }
                            <DropdownDivider />
                            <DropdownItem icon='sign-out' text='Sign Out' onClick={handleSignout} />
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    )
}

export default AppNavbar;

const useNavBarHandlers = () => {

    const location = useLocation();
    const { pathname } = location;

    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleNavToProfile = () => {
        navigate('/user-profile');
    }

    const handleNavToHome = () => {
        navigate('/');
    }
    const handleNavToUsersInfo = () => {
        navigate('/users-info');
    }
    const handleSignout = () => {
        logout();
    }

    return {
        handleNavToProfile,
        handleNavToHome,
        handleNavToUsersInfo,
        handleSignout,
        pathname,
    }
}