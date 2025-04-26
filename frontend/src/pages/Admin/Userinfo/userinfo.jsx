import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import BG from "../../../Assests/BG.jpg";
import "./table.css";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import palette from "../../../theme/palette";

const MainDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top-left",
});

function Userinfo() {
  const [listofUsers, setlistofUsers] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/user").then((response) => {
      setlistofUsers(response.data);
      console.log(response);
    });
  }, []);

  const handleclick = useCallback(() => {
    console.log("User clicked");
  }, []);

  const handleDelete = async (userId, userEmail) => {
    try {
      await axios.delete(`http://localhost:5000/user/${userId}`);
      alert("User deleted successfully!");
  
      // Send email notification
      await axios.post(`http://localhost:5000/send-email`, {
        to: userEmail,
        subject: "Account Deleted",
        text: "Your account has been deleted successfully."
      });
  
      // Refresh the list
      const response = await axios.get("http://localhost:5000/user");
      setlistofUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  return (
    <MainDiv>
      <Grid container>
        <Grid item xs={0.5} sm={1.5} md={2.5} lg={2}></Grid>
        <Grid
          item
          xs={11}
          sm={9}
          md={7}
          lg={8}
          sx={{
            backgroundColor: "white",
            padding: { xs: 2, md: 3 },
            borderRadius: 4,
            width: "100%",
            minHeight: "70vh",
          }}
        >
          <Box position={"relative"}>
            <Typography
              fontWeight={"bold"}
              sx={{ fontSize: { xs: "18px", md: "25px" } }}
              textAlign={"center"}
            >
              Users
            </Typography>
          </Box>
          <Box
            className="userinfo"
            sx={{
              maxHeight: { xs: "500px", md: "400px" },
              overflow: "auto",
              width: "100%",
            }}
          >
            <table sx={{ minWidth: 800 }} aria-label="simple table">
              <thead>
                <tr>
                  <th>No</th>
                  <th align="right">Name</th>
                  <th align="right">Email</th>
                  <th align="right">Phone</th>
                  <th align="right">Height</th>
                  <th align="right">Weight</th>
                  <th align="right">Request</th>
                  <th align="right">Action </th>
                </tr>
              </thead>
              <tbody>
                {listofUsers
                  .filter((user) =>
                    Search.toLowerCase() === ""
                      ? user
                      : user.firstName.toLowerCase().includes(Search) ||
                        user.lastName.toLowerCase().includes(Search)
                  )
                  .map((user, index) => (
                    <tr key={user._id} onClick={handleclick}>
                      <td>{index + 1}</td>
                      <td align="right">
                        {user.firstName + " " + user.lastName}
                      </td>
                      <td align="right">{user.email}</td>
                      <td align="right">{user.phone}</td>
                      <td align="right">{user.height}</td>
                      <td align="right">{user.weight}</td>
                      <td align="right">
                        {user.deleteRequest ? (
                          <span style={{ color: "red" }}>Requested</span>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td align="right">
                        <button
                            onClick={() => handleDelete(user._id, user.email)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "non",
                            padding: "5px 10px",
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
          <Box
            sx={{
              mt: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              placeholder="Search User"
              multiline
              maxRows={2}
              size="small"
              sx={{
                width: "200px",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </MainDiv>
  );
}

export default Userinfo;
