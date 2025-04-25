import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  styled,
  Grid,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import BG from "../../Assests/BG.jpg";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "" });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const id = decodedToken.id; // Ensure this matches your backend token structure
      setUserId(id);

      axios
        .get(`http://localhost:5000/user/${id}`)
        .then((response) => {
          setUser(response.data);
          console.log("User Data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  // Update user details
  const handleUpdate = async () => {
    if (!userId) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/user/${userId}`,
        updatedUser
      );
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user account
  const handleDelete = async () => {
    if (!userId) return;

    try {
        await axios.delete(`http://localhost:5000/user/${userId}`);
        alert("Account deleted successfully.");
  
        // Remove access token from local storage
        localStorage.removeItem("accessToken");
  
        // Navigate to the login page
        navigate("/");
      }catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Box
    sx={{
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2,
    }}
  >
    <Container maxWidth="sm">
     <Card sx={{ mt: 4, p: 3 }}>
       <CardContent>
         <Typography variant="h5" gutterBottom>
           Profile
         </Typography>

         {editMode ? (
            <>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                value={updatedUser.firstName}
                onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={updatedUser.lastName}
                onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              />
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                value={updatedUser.phone}
                onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
              />
              <TextField
                label="Weight"
                fullWidth
                margin="normal"
                value={updatedUser.weight}
                onChange={(e) => setUpdatedUser({ ...updatedUser, weight: e.target.value })}
              />
              <Box mt={2} display="flex" gap={2}>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            user && (
              <>
                <Typography variant="body1">
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Phone number:</strong> {user.phone}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Height:</strong> {user.height}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Weight:</strong> {user.weight}
                </Typography>
                <Box mt={2} display="flex" gap={2}>
                  <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                  <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete Account
                  </Button>
                </Box>
              </>
            )
          )}
        </CardContent>
      </Card>
    </Container>

    </Box>
  );
};

export default Profile;
