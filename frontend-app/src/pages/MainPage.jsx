import React, { useState, useContext } from "react";
import NowPlaying from "../components/NowPlaying";
import Popular from "../components/Popular";
import Credits from "../components/Credits";
import movieService from "../services/movieService";
import { useNavigate } from "react-router-dom";
import { Button, Image, Box } from "@chakra-ui/react";
import Refresh from "../assets/images/refresh.jpg";
import { AuthContext } from "../context/auth.context";

const MainPage = () => {
  const [shownMovieDetails, setShownMovieDetails] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Obtener la función de cierre de sesión del contexto

  const handleRefresh = () => {
    navigate("/");
    setShownMovieDetails(null);
  };

  const handleLogout = () => {
    logout(); // Llamar a la función de cierre de sesión
  };

  return (
    <div className="container">
      <Box position="fixed" top="10px" left="10px" zIndex="999" marginTop="20px">
        <Button onClick={handleRefresh} variant="unstyled">
          <Image w="120px" src={Refresh} />
        </Button>
      </Box>
      <Box position="fixed" top="10px" right="10px" zIndex="999" marginTop="20px">
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </Box>
      <NowPlaying
        movieService={movieService}
        setShownMovieDetails={setShownMovieDetails}
      />
      <Popular
        movieService={movieService}
        setShownMovieDetails={setShownMovieDetails}
      />
      {shownMovieDetails && (
        <Credits movieService={movieService} movie={shownMovieDetails} />
      )}
    </div>
  );
};

export default MainPage;
