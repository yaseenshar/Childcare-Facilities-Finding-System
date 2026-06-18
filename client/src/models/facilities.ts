export interface FacilitiesTypes {
    id: string;
    name: string;
    count?: number;
}

export interface FacilitiesTypesDesign {
    colors: {
        [key: string]: string;
    },
    icons?: {
        [key: string]: string;
    }
};

export interface SelectedFacilitiesTypes {
    id: string;
}