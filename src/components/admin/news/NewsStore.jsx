import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultType = "theater";
const initialNewsFormData = {
    value: {
        id: "",
        title: "",
        content: "",
        type: defaultType,
        image: null,
        isEdit: false
    }
};
const newsFormDataSlice = createSlice({
    name: 'newsData',
    initialState: initialNewsFormData,
    reducers: {
        setNewsData: (state, action) => {
            state.value = action.payload;
        },
        setTitle: (state, action) => {
            state.value.title = action.payload;
        },
        setContent: (state, action) => {
            state.value.content = action.payload;
        },
        setType: (state, action) => {
            state.value.type = action.payload;
        }
    }
});

const newsFormDataStore = configureStore({
    reducer: newsFormDataSlice.reducer
});

export { initialNewsFormData, defaultType };
export const { setNewsData, setTitle, setContent, setType } = newsFormDataSlice.actions;
export default newsFormDataStore;