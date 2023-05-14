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
  MDBModalFooter,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const age = calculateAge(user.dob);

  const onChangeRecipient = (event) => {
    setVaryingRecipient(event.target.value);
  };

  const onChangeMessage = (event) => {
    setVaryingMessage(event.target.value);
  };

  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    // password: user.password,
    phone: user.phone,
    address: user.address,
    dob: user.dob,
    image: null,
  });

  const { name, username, email, phone, address, dob, image } = formData; // password,

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Updated successfully");
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
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
    if (!name || !username || !email) {
      // !password
      alert("Please fill out all required fields");
      return;
    }
    const form_data = new FormData();
    if (name != user.name) {
      form_data.append("name", name);
    }
    if (username != user.username) {
      form_data.append("username", username);
    }
    if (email != user.email) {
      form_data.append("email", email);
    }

    // form_data.append("name", name);
    // form_data.append("username", username);
    // form_data.append("email", email);
    // form_data.append("password", password);
    if (phone != user.phone) {
      console.log("Phone", phone);
      form_data.append("phone", phone);
    }

    if (address != user.address) {
      form_data.append("address", address);
    }

    if (dob != user.dob) {
      form_data.append("dob", dob);
    }

    if (image) {
      form_data.append("image", image);
    }

    if (form_data) {
      dispatch(updateUserInfo(form_data));
    } else if (!form_data) {
      toast.error("No fields to update");
    }
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#ECE87D" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={user.image}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", height: "100%", zIndex: "1" }}
                    />
                    <MDBBtn
                      outline
                      color="dark"
                      style={{
                        height: "36px",
                        zIndex: "1",
                        overflow: "visible",
                      }}
                      onClick={() => {
                        setVaryingState("@mdo");
                        setVaryingModal(!varyingModal);
                        setVaryingRecipient("@mdo");
                      }}
                    >
                      Edit profile
                    </MDBBtn>

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
                                        sx={{ marginRight: 4, color: "#000" }}
                                      >
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
                                  sx={{ mt: 3, mb: 2 }}
                                >
                                  Update
                                </Button>
                              </Box>
                              <ToastContainer />
                            </Box>
                          </MDBModalBody>
                          <MDBModalFooter>
                            <MDBBtn
                              color="secondary"
                              onClick={() => setVaryingModal(!varyingModal)}
                            >
                              Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                          </MDBModalFooter>
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
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5"></MDBCardText>
                      <MDBCardText className="small text-muted mb-0"></MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">1026</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody>
                  {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr /> */}
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
      )}
    </div>
  );
}

export default Profile;
