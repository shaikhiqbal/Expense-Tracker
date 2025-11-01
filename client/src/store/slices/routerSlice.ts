import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Page = 'home' | 'dashboard' | 'transactions' | 'about' | 'contact' | 'profile' | 'settings';

interface RouterState {
  currentPage: Page;
}

const initialState: RouterState = {
  currentPage: 'home',
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { navigate } = routerSlice.actions;
export default routerSlice.reducer;