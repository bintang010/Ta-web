const { createSlice, configureStore } = require("@reduxjs/toolkit");

const newsFormStateSlice = createSlice({
    name: 'newsFormState',
    initialState: { value: false },
    reducers: {
        setNewsFormState: (state, action) => void(state.value = action.payload)
    }
});

const newsFormStateStore = configureStore({
    reducer: newsFormStateSlice.reducer
});

export const { setNewsFormState } = newsFormStateSlice.actions;
export default newsFormStateStore;