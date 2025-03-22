import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Axios from "axios";
import React, { useCallback, useState } from "react";
import BG from "../../Assests/BG.jpg";
import Logopng from "../../Assests/logo-no-background.png";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const MainDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  margin: 0,
  padding: 0,
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const LoginDiv = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "300px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "300px",
  },
  [theme.breakpoints.up("md")]: {
    width: "350px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "350px",
  },
  borderRadius: "20px",
  backgroundColor: "white",
  padding: "20px",
}));

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent page reload
    if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
  
      // Reset error if passwords match
      setError("");
    Axios.post("http://localhost:5000/user", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phone: phone,
      height: height,
      weight: weight,
      role: "member",
    })
    .then(() => navigate("/login")) // Redirect after successful registration
    .catch((err) => console.error("Error registering user:", err));  };

  return (
    <MainDiv>
      <LoginDiv>
        <Typography
          textAlign={"center"}
          color={"black"}
          fontSize={"22px"}
          fontWeight={600}
        >
          Register
        </Typography>
        <FlexContainer
          sx={{
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <img src={Logopng} alt="logo" width={"120px"} />
        </FlexContainer>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username (Email)"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                error={!!error} // Show error style if error exists
                helperText={error} // Show error message
                onChange={(event) => {
                  setconfirmPassword(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(event) => {
                  setHeight(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(event) => {
                  setWeight(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button fullWidth sx={{ mt: 2 }} variant="contained" type="submit">
            Register
          </Button>
        </form>
        <FlexContainer
          sx={{
            my: 2,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/")}
          >
            I Already Have an Account
          </Button>
        </FlexContainer>
      </LoginDiv>
    </MainDiv>
  );
}

export default Register;
