import { SelectedFacilitiesTypes } from '@/models/facilities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Property {
  id: number;
  telefon: string;
  snummer: number;
  leistungen: string;
  traeger: string;
  bezeichnung: string;
  strasse: string;
  plz: string;
  typ: number;
  kurzbezeichnung: string;
  ort: string;
  email: string;
  traegertyp: number;
  art: string;
  objectid: number;
  standorttyp: string;
  fax: string;
  nummer: number;
  globalID: string;
  creationDate: string;
  bezugnr: string;
  editor: string;
  sprachen: string;
  www: string;
  profile: string;
  creator: string;
  editDate: string;
  gebietsartnummer: number;
  bezeichnungzusatz: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Feature {
  properties: Property;
  geometry: Geometry;
}

export interface Facilities {
  id: string;
  name: string;
  features: Feature[];
}

interface facilitiesSlice {
  allFaciltities: Facilities[]
  selectedFaciltities: SelectedFacilitiesTypes[]
}


const initialState: facilitiesSlice = {
  allFaciltities: [],
  selectedFaciltities: []
};

export const facilitiesSlice = createSlice({
  name: 'facilities-slice',
  initialState,
  reducers: {
    updateFacilities: (state, action: PayloadAction<Facilities[]>) => {
      state = { ...state, allFaciltities: action.payload }
      return state;
    },
    updateSelectedFaciltities: (state, action: PayloadAction<SelectedFacilitiesTypes[]>) => {
      state = { ...state, selectedFaciltities: action.payload }
      return state;
    },
  },
});

export const { updateFacilities, updateSelectedFaciltities } = facilitiesSlice.actions;

export default facilitiesSlice.reducer;
