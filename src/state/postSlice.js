import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null };

//createAsyncThunk(type, asyncFunction)
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch("http://localhost:4000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//createAsyncThunk(type, asyncFunction)
export const deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:4000/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //getPosts
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
        console.log(action);
       //action => {type: 'posts/fetchPosts/fulfilled', payload: Array(2)}
      state.records = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //deletePosts
    [deletePosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deletePosts.fulfilled]: (state, action) => {
      console.log(action, "action");
      //action => {type: 'posts/deletePosts/fulfilled', payload: 2, meta: {…}}
      state.loading = false;
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    [deletePosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
