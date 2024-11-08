
import { Box, Button, TextField, Typography, styled } from "@mui/material"
import { useState ,useContext} from "react";
import { DataContext } from "../../context/DataProvider";
import makeApiRequest from "../../service/operations";
import { useNavigate } from "react-router-dom";
const Component = styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
`;
const Image = styled('img')({
    width: 100,
    margin: "auto",
    display: "flex",
    padding: '50px 0 0',


});

const Wrapper = styled(Box)`
padding:25px 35px;
display:flex;
flex:1;
flex-direction:column;
& > div, & > button, & > p {
    margin-top:15px;
}

`

const LoginButton = styled(Button)`
text-transform:none;
background:#FB641B;
color:#fff;
height:48px;

`

const SignupButton = styled(Button)`
text-transform:none;
background:#fff;
color:#2874f0;
height:48px;
box-shadow:0px 2px 4px 0 rgb(0 0 0/20%);

`;

const Text = styled(Typography)`
color:#878787;
font-size:16px;
`



const Login = (props) => {

    // useState 

    const bc=props.bc;
    const setbc=props.setbc;
    console.log(bc);


    const [Account, toggleAccount] = useState('Login');
    const [error,setError]=useState('');
    const [signup,setSignup]=useState({
         name:"",
         username:"",
         password:""
    })
    const [login,setLogin]=useState({
        username:"",
        password:"",
    })

    const {account,setAccount}=useContext(DataContext);

    const navigate=useNavigate();

    // functions
    const toggleSignup = () => {
        toggleAccount("signup")
    }
    const toggleLogin = () => {
        toggleAccount("Login")
    }
    const onInputChange=(e)=>
    {
         setSignup({...signup,[e.target.name]:e.target.value});
    }
    const onchange=(e)=>
    {
        
        setLogin({...login,[e.target.name]:e.target.value})
    }



    const signupUser=async(e)=>
    {
        e.preventDefault();
        const response=await makeApiRequest('post','/signup',signup);
        console.log(response);
      

        
    }

    async function loginUser(e)
    {
        e.preventDefault();
        const response=await makeApiRequest('post','/login',login);
        console.log(response.user);
      
        if(response.success)
        {
             sessionStorage.setItem("accessToken",`Bearer ${response.accessToken}`);
             sessionStorage.setItem("refreshToken",`Bearer ${response.refreshToken}`);
            setAccount({
                username:response.user.username,
                name:response.user.name
            }) 
            // console.log(account);

            //let back to the  home page

           console.log("helloooo");

           setbc(true);

           console.log(bc);

           

            navigate('/');



        }
        else
        {
            setError(`${response.message}`);

        }
        
    }

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    return (
        <Component>

            <Box>
                <Image src={imageURL} alt="Login" />

                {
                    Account === "Login" ?
                        <Wrapper>

                            <TextField variant="standard" label="Enter UserName" onChange={onchange} name="username"></TextField>
                            <TextField variant="standard" label="Enter Password" onChange={onchange} name="password" ></TextField>
                            <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>

                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={toggleSignup}>Create An Account</SignupButton>
                        </Wrapper> :
                        <Wrapper>

                            <TextField variant="standard" label="Enter Name" onChange={onInputChange} name='name'></TextField>
                            <TextField variant="standard" label="Enter UserName" onChange={onInputChange} name='username'></TextField>
                            <TextField variant="standard" label="Enter Password" onChange={onInputChange} name="password"></TextField>
                            <SignupButton   variant="contained" onClick={signupUser}>Signup</SignupButton>

                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton onClick={toggleLogin}>Already have an Account </LoginButton>
                        </Wrapper>

                }


            </Box>

        </Component>

    )

}

export default Login;