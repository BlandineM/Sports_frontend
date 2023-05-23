import { DEFAULT_LANG } from '../../config/staticKeys';
import i18n from '../../translations/i18n';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  lang: string;
  languages: string[];
  themes: {
    universe: string;
    theme: string;
  }[];
  chat_showNotConnectedFriends: boolean;
}
const initialState: SettingsState = {
  themes: [],
  lang: i18n.language,
  chat_showNotConnectedFriends: false,
  languages: [DEFAULT_LANG],
};

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setActiveTheme: (state, action: PayloadAction<SettingsState['themes'][0]>) => {
      //theme for universe already in settings ? then update else add
      const currentThemeIndex = state.themes.findIndex((theme) => theme.universe === action.payload.universe);

      if (currentThemeIndex > -1) {
        state.themes[currentThemeIndex] = action.payload;
      } else {
        state.themes.push(action.payload);
      }
    },
  },
});

export const { setSettings, setActiveTheme } = SettingsSlice.actions;
export default SettingsSlice.reducer;
