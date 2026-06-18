import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/AuthenticationContext/authContext';
import AuthGaurd from '@/AuthenticationContext/authGaurd';
import Home from '@/scene/home';
import Login from '@/scene/login';
import Signup from '@/scene/signup';
import NotFound from './scene/notFound';
import UserProfile from './scene/userProfile';
import Layout from './scene/layout';
import InActiveUser from './scene/usersStatusInfo';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <AuthGaurd>
              <Layout>
                <Home />
              </Layout>
            </AuthGaurd>
          }
          />
          <Route path="/user-profile" element={
            <AuthGaurd>
              <Layout>
                <UserProfile />
              </Layout>
            </AuthGaurd>
          }
          />
          <Route path="/users-info" element={
            <AuthGaurd>
              <Layout>
                <InActiveUser />
              </Layout>
            </AuthGaurd>
          }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;