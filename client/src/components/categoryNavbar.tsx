import React, { useEffect, useState } from "react";
import AppButton from "./appButton";
import { Icon, Label, SemanticCOLORS, StrictButtonProps } from "semantic-ui-react";
import { useFacilitiesLocation, useFacilitiesTypes } from "@/hooks/facilitiesModule/useFacilities";
import { FacilitiesTypesDesign, SelectedFacilitiesTypes } from "@/models/facilities";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedFaciltities } from "@/redux/reducers/facilitiesSlice";

interface CategoryNavbarProps {
    label?: string;
}
const CategoryNavbar: React.FC<CategoryNavbarProps> = ({ label, ...rest }) => {

    const { facilitiesTypes, buttonDesign, selectedFacility, handleSelectItem } = useCategoryHandlers();

    const getColor = (facilityName: string): string => {
        return buttonDesign.colors[facilityName] || 'grey';
    }
    const checkSelectedItem = (id: string): boolean => {
        return selectedFacility.filter(x => x.id === id).length > 0 || false;
    }


    return (
        <div className="flex justify-center space-x-2 sm:space-x-4 fixed w-full top-24 px-4 sm:px-0">
            {facilitiesTypes && facilitiesTypes.length > 0 && facilitiesTypes.map(item => {

                return (
                    <AppButton onClick={() => handleSelectItem(item.id)} key={item.id} as='div' labelPosition='right' className="p-2 sm:p-4 bg-red-300 rounded-full text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <AppButton color={getColor(item.name) as StrictButtonProps["color"]}>
                            {checkSelectedItem(item.id) && <Icon name="checkmark" />}
                            {item.name}
                        </AppButton>
                        <Label as='a' basic color={getColor(item.name) as SemanticCOLORS} pointing='left'>
                            {item.count || '12023'}
                            {checkSelectedItem(item.id)}
                        </Label>
                    </AppButton>
                )
            })}
        </div>
    )
};

export default CategoryNavbar;


const useCategoryHandlers = () => {
    const { data: facilitiesTypes } = useFacilitiesTypes();
    const { getFacilitiesLocation } = useFacilitiesLocation();
    const [selectedFacility, setSelectedFacility] = useState<SelectedFacilitiesTypes[]>([])

    const dispatch = useDispatch<AppDispatch>();
    const facilitiesMeta = useSelector((state: RootState) => state.facilitiesReducer);

    const { selectedFaciltities } = facilitiesMeta;

    useEffect(() => {
        if (facilitiesTypes?.length && !selectedFacility.find(x => x.id === facilitiesTypes[0]?.id) && selectedFaciltities?.length <= 0)
            setSelectedFacility([{ id: facilitiesTypes[0]?.id }]);
        else
            setSelectedFacility([...selectedFaciltities]);
    }, [facilitiesTypes])

    useEffect(() => {
        if (selectedFaciltities) {
            getFacilitiesLocation("facilitiesIds", selectedFaciltities.map(item => item.id))
                .then(response => response).catch(error => {
                    console.error("error while Login", error)
                })
        }
    }, [facilitiesTypes, selectedFaciltities])

    const handleSelectItem = (id: string) => {
        const valueIndex = selectedFacility.findIndex(x => x.id === id);
        let updateFacilities = [...selectedFacility];
        if (valueIndex === -1) {
            updateFacilities = [...updateFacilities, { id: id }]
            setSelectedFacility(updateFacilities);
            dispatch(updateSelectedFaciltities(updateFacilities))
        } else {
            updateFacilities.splice(valueIndex, 1)
            setSelectedFacility([...updateFacilities]);
            dispatch(updateSelectedFaciltities([...updateFacilities]))
        }
    }


    const buttonDesign: FacilitiesTypesDesign = {
        colors: {
            Jugendberufshilfen: "blue",
            Schulsozialarbeit: "red",
            Kindertageseinrichtungen: "teal",
            Schulen: "purple"
        },
        icons: {
            Jugendberufshilfen: "user",
            Schulsozialarbeit: "home",
        }
    }

    return {
        facilitiesTypes,
        buttonDesign,
        selectedFacility,
        handleSelectItem,
    }
}