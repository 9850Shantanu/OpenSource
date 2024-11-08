import React, { useState, useEffect, useContext } from 'react';
import makeApiRequest from '../../service/operations';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { getAccessToken } from '../../utils/commonutils';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from "axios"

import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const { id } = useParams();


    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {


            // for only file upload to cloduinary and to get secure url for the posts 
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('name', account.name);
                formData.append('username', account.username);

                const response = await axios.post('http://localhost:8000/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const pictureUrl = await response.data.imageUrl;
                setPost({ ...post, picture: pictureUrl });
            }

            post.categories = location.search?.split('=')[1] || 'All';
            post.username = account.username;
        }

        getImage();
    }, [file])

    async function updateBlog() {

        console.log("Post", post);

        const response = await makeApiRequest('post', `/update/${id}`, post);
        console.log("response", response);


        navigate(`/details/${id}`)


    }



    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    name="imageFile"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={updateBlog} variant="contained" color="primary">Update</Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                
                name='description'
                onChange={(e) => handleChange(e)}
            />
        </Container>
    )
}

export default Update;