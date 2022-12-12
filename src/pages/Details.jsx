import usePostDetails from "../Hooks/use-post-details";
import Loading from "../components/Loading";


const Details = () => {
  const { loading, error, record } = usePostDetails();


  return (
    <div>
      <Loading loading={loading} error={error} >
        <p>title : {record?.title}</p>
        <p>title : {record?.description}</p>
      </Loading>
   </div> 
  )
};

export default Details;
