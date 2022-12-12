import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null , record:null };


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


export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(id)
    try {
      const res = await fetch(`http://localhost:4000/posts/${id}`);
      const data = await res.json();
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
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

export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth, posts } = getState();
    console.log(auth); //{id: 1, isLoggedIn: true}
    item.userId = auth.id;

    try {
      console.log(item, "item");
      const res = await fetch("http://localhost:4000/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      });

      const data = await res.json();
      return data;
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

    [fetchPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.record = null;
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [fetchPost.rejected]: (state,action) => {
      state.error = action.payload;
      state.loading = false;
    },
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

    [insertPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [insertPost.fulfilled]: (state, action) => {
      console.log(action, "action");
      state.loading = false;
      state.records.push(action.payload);
    },
    [insertPost.rejected]: (state, action) => {
      console.log(action, "action");
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
