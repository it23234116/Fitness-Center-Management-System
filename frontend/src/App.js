import { createTheme, ThemeProvider } from "@mui/material";
import React,{lazy} from "react";import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom";
import palette  from "./theme/palette"
import Loading from "./components/Loading/Loading";
import typography from "./theme/typography";
import './App.css'




const Login = React.lazy(()=> import ("./pages/Login/login"))
const Register = React.lazy(()=> import ("./pages/Register/register"))


const theme = createTheme ({
  palette: palette.light,
  typography,

})
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<React.Suspense fallback={<Loading />}><Login /></React.Suspense>} />
        <Route path="/register" element={<React.Suspense fallback={<Loading />}><Register /></React.Suspense>} />

          



        </Routes>
      </Router>
    </div>
    {/* <RouterProvider router={router} /> */}

    </ThemeProvider>
  );
}

export default App;
