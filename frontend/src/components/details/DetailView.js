
import { useEffect,useState } from "react"
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {useParams,Link} from "react-router-dom"
import axios from "axios"
import makeApiRequest from "../../service/operations"


const Container = styled(Box)(({ theme }) => ({
   margin: '50px 100px',
   [theme.breakpoints.down('md')]: {
       margin: 0
   },
}));

const Image = styled('img')({
   width: '100%',
   height: '50vh',
   objectFit: 'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;
const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;







const DetailView=()=>
{

   const [post,setPost]=useState({});
   const {id}=useParams();



   const url="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
   
   const urls=`http://localhost:8000/details/${id}`


   async function deleteBlog()
   {
      console.log("seeeeeeeeeee");
      const deleted=await axios.delete(`http://localhost:8000/delete/${id}`);

      console.log(deleted);
   }

   useEffect(()=>
   {
      const fetchData=async()=>
      {
         const response = await axios.get(urls);
         console.log(response);
           
         setPost(response.data.response);

         console.log("post",post.title);
          
      };

      fetchData();

   },[id])
   return (
    <Container>

      <Image src={url} alt="blog"/>


      <Box>
         <Link to={`/update/${id}`}>

                   <EditIcon/>
         </Link>
        
         <DeleteIcon onClick={deleteBlog}/>

      </Box>

      <Heading >{post.title}</Heading>

      <Box>
         <Typography>{post.username}</Typography>
         <Typography>{new Date(post.createdDate).toDateString()}</Typography>
      </Box>


      <Typography>{post.desciption}</Typography>



    </Container>

   )
}

export default DetailView;
