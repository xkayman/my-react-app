import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TemperatureUnit = 'C' | 'F' | 'K';

interface SettingsState {
  unit: TemperatureUnit;
  favorites: number[];
}

const savedUnit = localStorage.getItem('tempUnit') as TemperatureUnit | null;
const savedFavorites = localStorage.getItem('favoriteCities');

const initialState: SettingsState = {
  unit: savedUnit || 'C',
  favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.unit = action.payload;
      localStorage.setItem('tempUnit', action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const cityId = action.payload;
      if (state.favorites.includes(cityId)) {
        state.favorites = state.favorites.filter(id => id !== cityId);
      } else {
        state.favorites.push(cityId);
      }
      localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
    },
  },
});

export const { setUnit, toggleFavorite } = settingsSlice.actions;
export default settingsSlice.reducer;