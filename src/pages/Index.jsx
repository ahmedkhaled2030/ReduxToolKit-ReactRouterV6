import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import PostList from '../components/PostList'
import { deletePosts, fetchPosts } from '../state/postSlice';

const Index = () => {
  const dispatch = useDispatch();
  const {records , loading , error} = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  
  const deleteRecord = useCallback((id) => {
    dispatch(deletePosts(id))
  } , [dispatch]) 

  return (
    <Loading loading={loading} error={error} >
    <PostList data={records} deleteRecord = {deleteRecord} />
    </Loading>

  )
}

export default Index