import {
  Box,
  Button,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BG from "../../Assests/BG.jpg";
import Logopng from "../../Assests/maxxieslogos.png";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Icon, icon } from "@iconify/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
const images = [
  "https://via.placeholder.com/300x200.png?text=Image+1",
  "https://via.placeholder.com/300x200.png?text=Image+2",
  "https://via.placeholder.com/300x200.png?text=Image+3",
];
function Home() {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <MainDiv>
      <Grid container>
        <Grid item sm={5}>
          <Box display={"flex"} ml={2}>
            <FlexContainer
              sx={{
                justifyContent: "center",
                mt: 2,
                mb: 2,
              }}
            >
              <img src={Logopng} alt="logo" width={"120px"} />
            </FlexContainer>
            <FlexContainer>
              <Box
                sx={{
                  mt: 2,
                  mb: 2,
                  ml: 1,
                  borderRadius: 2,
                  padding: 2,
                  backgroundColor: "white",
                  backgroundopacity: 0.7,
                }}
              >
                {" "}
                <Typography
                  textAlign={"center"}
                  color={"#2168BA"}
                  fontSize={"22px"}
                  fontWeight={600}
                >
                  Maxxies Fitness
                </Typography>
              </Box>
            </FlexContainer>
          </Box>

          <Box
            sx={{
              justifyContent: "space-between",
              mt: 2,
              ml: 2,
              height: 300,
              borderRadius: 4,
              //   boxShadow: 3,
            }}
          >
            <Grid
              container
              mt={1}
              xs={12}
              display={"flex"}
              // justifyContent={'space-between'}
              gap={1}
              padding={2}
            >
              <Grid item xs={8}>
                <Button
                  variant={"contained"}
                  fullWidth
                  sx={{
                    minHeight: 100,
                    borderRadius: 4,
                  }}
                  // onClick={() => onClick(content)}
                >
                  <FlexContainer
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Icon icon="codicon:edit-session" fontSize={30} />
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        flexGrow: 1,
                        pr: 3,
                      }}
                    >
                      Session
                    </Typography>
                  </FlexContainer>
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  color="warning"
                  variant={"contained"}
                  fullWidth
                  sx={{ borderRadius: 4, minHeight: 80 }}
                  // onClick={() => onClick(content)}
                >
                  <FlexContainer
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Icon icon="uis:schedule" fontSize={30} />
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        flexGrow: 1,
                        pr: 3,
                      }}
                    >
                      Schedule
                    </Typography>
                  </FlexContainer>
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant={"contained"}
                  fullWidth
                  sx={{ borderRadius: 4, minHeight: 80 }}
                  // onClick={() => onClick(content)}
                >
                  <FlexContainer
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Icon icon="mdi:cart" fontSize={30} />
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        flexGrow: 1,
                        pr: 3,
                      }}
                    >
                      Store
                    </Typography>
                  </FlexContainer>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={7}>
          <Box
            sx={{
              backgroundColor: "white",
              ml: 2,
              mr: 2,
              height: 500,
              borderRadius: 4,
              boxShadow: 3,
              position: "relative", // important!
              overflow: "hidden", 
            }}
          >
            <img
              src={images[index]}
              alt={`slide-${index}`}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
                transition: "all 0.5s ease-in-out",
              }}
            />

            {/* Left Button */}
            <IconButton
              onClick={prevImage}
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: 1,
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* Right Button */}
            <IconButton
              onClick={nextImage}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </MainDiv>
  );
}

export default Home;
