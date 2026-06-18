import { useGetActiveUsers, useGetInActiveUsers } from '@/hooks/profileManagement/useProfile';
import React from 'react';
import { Grid, Header, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';


const InActiveUser: React.FC = () => {

    const { inActiveUsersData, activeUsersData } = useInActiveUserHandlers();

    return (
        <Grid textAlign='center' style={{ height: '100vh', minWidth: '90%' }} verticalAlign='middle'>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1050 }} >
                    <Header as='h1' color='teal' textAlign='center'>
                        In-Active Users
                    </Header>
                    <Table celled>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>First Name</TableHeaderCell>
                                <TableHeaderCell>Last Name</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inActiveUsersData && inActiveUsersData?.length > 0 && inActiveUsersData.map(item => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.firstName}</TableCell>
                                        <TableCell>{item.lastName}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell className='flex justify-center' negative><Icon name='close' />{item.status === 0 && "In-Active"}</TableCell>
                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1050 }} >
                    <Header as='h1' color='teal' textAlign='center'>
                        In-Active Users
                    </Header>
                    <Table celled>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>First Name</TableHeaderCell>
                                <TableHeaderCell>Last Name</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeUsersData && activeUsersData?.length > 0 && activeUsersData.map(item => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.firstName}</TableCell>
                                        <TableCell>{item.lastName}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell className='flex justify-center' positive><Icon name='checkmark' />{item.status === 0 && "In-Active"}</TableCell>
                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default InActiveUser;

const useInActiveUserHandlers = () => {
    const { data: inActiveUsersData } = useGetInActiveUsers(false);
    const { data: activeUsersData } = useGetActiveUsers(false);


    return {
        activeUsersData,
        inActiveUsersData
    }
}