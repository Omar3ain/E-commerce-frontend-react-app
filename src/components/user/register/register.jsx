import React, { useEffect, useMemo, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../../../features/auth/authSlice";
import Loader from "../../layout/loader";
import countryList from "react-select-country-list";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: null,
    streetName: "",
    buildingNo: null,
    floorNo: null,
    apartmentNo: null,
    dob: "",
    image: null,
  });

  const {
    name,
    username,
    email,
    password,
    phone,
    country,
    streetName,
    buildingNo,
    floorNo,
    apartmentNo,
    dob,
    image,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isRegisterSuccess, message } = useSelector(
    (state) => state.auth
  );

  const options = useMemo(() => {
    const countries = countryList().getData();
    return countries.map((country) => ({
      label: `${country.label} (${country.value})`,
      value: country.value,
    }));
  }, []);

  useEffect(() => {
    if (isRegisterSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }

    if (user && !isRegisterSuccess) {
      navigate("/profile");
    }
  }, [user, isError, isRegisterSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    } else if (e.target.name === "country") {
      setFormData((prevState) => ({
        ...prevState,
        country: e.target.value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password) {
      alert("Please fill out all required fields");
      return;
    }
    const form_data = new FormData();
    form_data.append("name", name);
    form_data.append("username", username);
    form_data.append("email", email);
    form_data.append("password", password);
    if (phone) {
      form_data.append("phone", phone);
    }

    if (country) {
      form_data.append("country", country);
    }

    if (streetName) {
      form_data.append("street_name", streetName);
    }

    if (buildingNo) {
      form_data.append("building_no", buildingNo);
    }

    if (floorNo) {
      form_data.append("floor_no", floorNo);
    }

    if (apartmentNo) {
      form_data.append("apartment_no", apartmentNo);
    }

    if (dob) {
      form_data.append("dob", dob);
    }

    if (image) {
      form_data.append("image", image);
    }

    dispatch(register(form_data));
  };

  return (
    <div style={{ backgroundColor: "#85822E" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm" sx={{ padding: 2 }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                py: 4, // padding top & bottom
                px: 3, // padding left & right
                borderRadius: "sm",
                boxShadow: "md",
                bgcolor: "#FAFDF6",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#85822E" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={onSubmit}
                sx={{ mt: 3 }}
                encType="multipart/form-data"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      autoFocus
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Enter your username"
                      name="username"
                      autoComplete="username"
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Enter your E-mail"
                      name="email"
                      autoComplete="email"
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      id="dob"
                      label="Date of Birth"
                      type="date"
                      name="dob"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="phone"
                      label="Phone"
                      name="phone"
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId="country-label"
                        id="country"
                        name="country"
                        value={country}
                        onChange={onChange}
                      >
                        {options.map((option, i) => (
                          <MenuItem key={i} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <FormControl fullWidth>
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId="country-label"
                        id="country"
                        name="country"
                        value={country}
                        onChange={onChange}
                      >
                        {options.map((option, i) => (
                          <MenuItem key={i} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                    {/* <CountrySelect
                      id="country"
                      label="Country"
                      name="country"
                      fullWidth
                      onChange={onChange}
                      value={country}
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="streetName"
                      label="Street Name"
                      name="streetName"
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="buildingNo"
                      label="Building No"
                      name="buildingNo"
                      type="number"
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="floorNo"
                      label="Floor No"
                      name="floorNo"
                      type="number"
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="apartmentNo"
                      label="Apartment No"
                      name="apartmentNo"
                      type="number"
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label htmlFor="image">
                      <Typography variant="h6" sx={{ marginRight: 4 }}>
                        Upload Image
                      </Typography>
                    </label>
                    <input
                      accept="image/*"
                      id="image"
                      name="image"
                      type="file"
                      onChange={onChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#ece87d",
                    color: "#2d2a32",
                    "&:hover": { backgroundColor: "#fffcae" },
                  }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={() => navigate("/login")} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              <ToastContainer />
            </Box>
            <Copyright sx={{ mt: 5, color: "#FAFDF6" }} />
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}

export default Register;
