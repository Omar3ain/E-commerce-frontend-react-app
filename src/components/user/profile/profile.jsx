import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updateUserInfo } from "../../../features/auth/authSlice";
import Loader from "../../layout/loader";
import Button from "@mui/material/Button";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

function calculateAge(dob) {
  const now = new Date();
  const dobDate = new Date(dob);
  let age = now.getFullYear() - dobDate.getFullYear();
  const monthDiff = now.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dobDate.getDate())) {
    age--;
  }
  return age;
}

function Profile() {
  const [varyingState, setVaryingState] = useState("");
  const [varyingModal, setVaryingModal] = useState(false);
  const [varyingRecipient, setVaryingRecipient] = useState("");
  const [varyingMessage, setVaryingMessage] = useState("");
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      setImageName('');
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }

    if(!user){
      navigate('/login');
    }

  }, [user, isError, isSuccess, message, navigate, dispatch]);


  let age;
  if (user && user.dob) {
    age = calculateAge(user.dob);
  }

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    username: user ? user.username : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    address: user ? user.address : '',
    dob: user ? user.dob : '',
    image: null,
  });

  const { name, username, email, phone, address, dob, image } = formData; // password,

  
  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
      setImageName(e.target.files[0].name);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !email) {
      alert("Please fill out all required fields");
      return;
    }
    const formData2 = {};
  
    if (name !== user.name) {
      formData2.name = name;
    }
  
    if (username !== user.username) {
      formData2.username = username;
    }
  
    if (email !== user.email) {
      formData2.email = email;
    }
  
    if (phone !== user.phone) {
      formData2.phone = phone;
    }
  
    if (address !== user.address) {
      formData2.address = address;
    }
  
    if (dob !== user.dob) {
      formData2.dob = dob;
    }
  
    if (image) {
      formData2.image = image;
    }
  
    console.log('hopa', formData2);
    const keys = Object.keys(formData2);
    if (keys.length > 0) {
      const updatedData = new FormData();
      keys.forEach(key => {
        updatedData.append(key, formData2[key]);
      });
      dispatch(updateUserInfo(updatedData));
    } else {
      alert("No fields to update");
    }
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#ECE87D" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        {user ? (
          <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#595630", height: "200px" }} >
                  
                  <div className="ms-4 mt-4 d-flex flex-column"
                    style={{ width: "150px" }} >
                    <MDBBtn
                      // color="dark"
                      // className="btn btn-primary"
                      style={{
                        height: "36px",
                        color: "#000",
                        zIndex: "1",
                        overflow: "visible",
                        position: "sticky",
                        backgroundColor: "#DDD92A"
                      }}
                      onClick={() => {
                        setVaryingState("@mdo");
                        setVaryingModal(!varyingModal);
                        setVaryingRecipient("@mdo");
                      }}
                    >
                      Edit profile
                    </MDBBtn>
                    <MDBCardImage
                      src={user.image}
                      alt="Generic placeholder image"
                      className="mt-2 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "100%", height: "100%", zIndex: "1" }}
                    />
                    

                    <MDBModal
                      show={varyingModal}
                      setShow={setVaryingModal}
                      tabIndex="-1"
                    >
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>
                              New message to {varyingState}
                            </MDBModalTitle> 
                            <MDBBtn
                              className="btn-close"
                              color="none"
                              onClick={() => setVaryingModal(!varyingModal)}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>
                            <Box
                              sx={{
                                marginTop: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                              >
                              <Box
                                component="form"
                                noValidate
                                onSubmit={onSubmit}
                                sx={{ mt: 3 }}
                                encType="multipart/form-data"
                                >
                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      autoComplete="given-name"
                                      name="name"
                                      label="Name"
                                      fullWidth
                                      id="name"
                                      defaultValue={user.name}
                                      autoFocus
                                      onChange={onChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      id="username"
                                      label="Username"
                                      defaultValue={user.username}
                                      name="username"
                                      autoComplete="username"
                                      onChange={onChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      id="email"
                                      label="Email Address"
                                      defaultValue={user.email}
                                      name="email"
                                      autoComplete="email"
                                      onChange={onChange}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      id="dob"
                                      label="Date of Birth"
                                      defaultValue={user.dob}
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
                                      label="Phone Number"
                                      defaultValue={user.phone}
                                      name="phone"
                                      fullWidth
                                      onChange={onChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      id="address"
                                      label="Address"
                                      defaultValue={user.address}
                                      name="address"
                                      fullWidth
                                      multiline
                                      rows={4}
                                      onChange={onChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <label htmlFor="image">
                                      <Typography
                                        variant="h6"
                                        sx={{ marginRight: 4,
                                              color: imageName ? "#007711" : "#000",
                                              fontWeight: "normal",
                                              "&:hover": { fontWeight: "bold" }
                                            }}
                                      >
                                        {imageName ? imageName : "Upload Image"}
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
                                  sx={{ mt: 3, mb: 2 }}
                                >
                                  Update
                                </Button>
                              </Box>
                              <ToastContainer />
                            </Box>
                          </MDBModalBody>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">{user.name}</MDBTypography>
                    <MDBCardText>{user.username}</MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#EEEFA8" }}
                >
                  
                </div>
                <MDBCardBody 
                  style={{ backgroundColor: "#EEEFA8" }}
                >
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.phone}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        ) : (<></>)}
        </>
      )}
    </div>
  );
}

export default Profile;
