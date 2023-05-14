import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../layout/loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { login } from "../../../features/auth/authSlice";
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import 'react-toastify/dist/ReactToastify.css';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function Login() {
  const AdminURL = 'http://127.0.0.1:8000/admin/'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isSuccess || user) {
      // if(user.isAdmin){
      //   toast.success("Logged in successfully as admin");
      //   setTimeout(() => {
      //     // window.location.assign(AdminURL);
      //   }
      //   , 2000);
      // }
      setIsLoggedIn(true);
    }
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isSuccess, isError]);
  
  const submitHandler = () => {

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoggedIn) {
    toast.success("Logged in successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <CssVarsProvider>
      <main>
        <ModeToggle />
        <Sheet
          sx={{
            width: 600,
            height: 400,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              placeholder="your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={submitHandler}>Login</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
          <ToastContainer />
        </Sheet>
      </main>
    </CssVarsProvider>
    )}
    </Fragment>
    
);
}

export default Login;
