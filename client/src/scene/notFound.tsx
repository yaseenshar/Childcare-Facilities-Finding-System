import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';

const NotFound: React.FC = () => {

    const { onNavigateToHome } = useNotFoundHandlers();
    
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center">
                            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-500">404</h1>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
                            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                            <Button color='teal' fluid size='large' onClick={onNavigateToHome}>
                                Back to Home Page
                            </Button>
                        </div>
                    </div>
                </section>
            </Grid.Column>
        </Grid>
    );
};

export default NotFound;

const useNotFoundHandlers = () => {

    const navigate = useNavigate();

    const onNavigateToHome = () => {
        navigate("/")
    }

    return {
        onNavigateToHome
    }
}