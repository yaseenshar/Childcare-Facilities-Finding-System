import AppModal from '@/components/appModal';
import CategoryNavbar from '@/components/categoryNavbar';
import CustomGoogleMap from '@/components/google/customGoogleMap';
import { Property } from '@/redux/reducers/facilitiesSlice';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Icon, Image, ModalDescription } from 'semantic-ui-react';
import favoritesBefore from "@/assets/icons/favourite-before.png";
import favoritesAfter from "@/assets/icons/favourite-after.png";
import { useMarkFavorites, useUnMarkFavorites } from '@/hooks/favoritesModule/useFavorites';
import { getLocalUserInfo } from '@/helpers/localstorage';
import { Favorites } from '@/models/favorites';
import { checkIsPowerUser } from '@/helpers/permissions';

const Home = () => {
    const { allFaciltities, facilityData, handleMarkerClick, openDetailsModal, handleToogleModal, handleMarkFavorites, handleUnMarkFavorites, handleCheckIsFavorites } = useHomeHandlers();

    return (
        <>
            <CustomGoogleMap markedlocations={allFaciltities} handleMarkerClick={handleMarkerClick} />
            <CategoryNavbar />
            <AppModal open={openDetailsModal} HeaderTitle='Facility Details' setModalState={handleToogleModal}>
                <ModalDescription>
                    <Header className='flex justify-end'>
                        {facilityData && Object?.keys(facilityData)?.length > 0 &&
                            <>
                                <Image src={handleCheckIsFavorites(facilityData?.id) ? favoritesAfter : favoritesBefore} size='mini' className='!mx-4 !text-xs cursor-pointer' onClick={() => handleCheckIsFavorites(facilityData?.id) ? handleUnMarkFavorites(facilityData?.id) : handleMarkFavorites(facilityData?.id)}></Image>
                                <Link
                                    to='#'
                                    onClick={(e) => {
                                        if (facilityData?.telefon)
                                            window.location.href = `tel:${facilityData?.telefon.split(' ')[0]} ${facilityData?.telefon.split(' ')[1]}`;
                                        e.preventDefault();
                                    }}
                                ><Icon disabled={!facilityData?.telefon} size='large' className={`!mx-4 ${!facilityData?.telefon ? 'cursor-not-allowed' : 'cursor-pointer'}`} name='phone' />
                                </Link>
                                <Link
                                    to='#'
                                    onClick={(e) => {
                                        if (facilityData?.email)
                                            window.location.href = `mailto:${facilityData?.email}`;
                                        e.preventDefault();
                                    }}
                                ><Icon disabled={!facilityData?.email} size='large' className={`!mx-4 ${!facilityData?.email ? 'cursor-not-allowed' : 'cursor-pointer'}`} name='mail' />
                                </Link>
                            </>
                        }
                    </Header>
                    <Grid>
                        <Grid.Row>
                            {facilityData && Object?.keys(facilityData)?.length > 0 && Object?.keys(facilityData).map((item, index) => (
                                // Using Grid.Row and Grid.Column to manage the layout
                                (facilityData as any)[item] && (
                                    <Grid.Column key={index} width={4}>
                                        <p className='!mb-8 break-words'>
                                            <span className='!text-primary-500 mr-4 text-xl font-bold'>{item}:</span>
                                            <span>{(facilityData as any)[item] ? (facilityData as any)[item] : '--'}</span>
                                        </p>
                                    </Grid.Column>
                                )
                            ))}
                        </Grid.Row>
                    </Grid>
                </ModalDescription>
            </AppModal >
        </>
    );
}

export default Home

const useHomeHandlers = () => {
    const facilitiesMeta = useSelector((state: RootState) => state.facilitiesReducer);
    const { allFaciltities } = facilitiesMeta;
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
    const [facilityData, setFacilityData] = useState<Property | null>(null);
    const [selectedCatFacilityId, setSelectedCatFacilityId] = useState<string>("");
    const userInfo = getLocalUserInfo();
    const { unMarkFavorites } = useUnMarkFavorites();


    const { markFavorites } = useMarkFavorites();

    const handleMarkerClick = (facilityCategoryId: string, facilityId: number) => {
        const filteredData = findFeatureProperties(facilityCategoryId, facilityId);
        setFacilityData(filteredData);
        setOpenDetailsModal(true);
        setSelectedCatFacilityId(facilityCategoryId);
    }

    const findFeatureProperties = (facilityCategoryId: string, facilityId: number): Property | null => {
        const item = allFaciltities.find(d => d.id === facilityCategoryId);
        if (!item) {
            return null;
        }
        const feature = item.features.find(f => f.properties.id === facilityId);
        return feature ? feature.properties : null;
    }

    const handleToogleModal = (state: boolean) => {
        setOpenDetailsModal(state);
    }

    const handleMarkFavorites = (facilityId: number) => {
        const data: Favorites = {
            userId: userInfo.id,
            placeId: facilityId.toString(),
            categoryId: selectedCatFacilityId,
        }
        const isAllowed = !checkIsPowerUser(userInfo) && userInfo.favoritePlaces && userInfo.favoritePlaces.length <= 0 || checkIsPowerUser(userInfo);
        isAllowed && markFavorites('userFavorites', data)
            .then(response => response).catch(error => {
                console.error("error while Login", error)
            })
    }

    const handleUnMarkFavorites = (facilityId: number) => {
        const favoriteId = getFavoritesId(facilityId);
        unMarkFavorites('userDeleteFavorites', favoriteId)
            .then(response => response).catch(error => {
                console.error("error while Login", error)
            })
    }

    const handleCheckIsFavorites = (facilityId: number): boolean => {
        const favFilter = userInfo?.favoritePlaces?.filter(x => x.placeId === facilityId.toString() && x.categoryId === selectedCatFacilityId)
        return favFilter ? favFilter.length > 0 : false;
    }

    const getFavoritesId = (facilityId: number): string => {
        const favFilter = userInfo?.favoritePlaces?.filter(x => x.placeId === facilityId.toString() && x.categoryId === selectedCatFacilityId)
        return favFilter ? favFilter[0]?.id || "0" : "0";
    }

    const isPowerUser = () => {
        return checkIsPowerUser(userInfo);
    }


    return { allFaciltities, facilityData, openDetailsModal, isPowerUser, unMarkFavorites, handleMarkerClick, handleToogleModal, handleMarkFavorites, handleUnMarkFavorites, handleCheckIsFavorites }
}