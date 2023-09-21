import { Flex, Box, Image, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const NowPlaying = ({ setShownMovieDetails, movieService }) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [shownMovie, setShownMovie] = useState(0);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const result = await movieService.getNowPlayingMovies();
        setNowPlayingMovies(result.results);
      } catch (error) {
        console.error("Error fetching Now Playing movies:", error);
      }
    };
    fetchNowPlayingMovies();
  }, []);

  const handleNext = () => {
    setShownMovie((prev) =>
      prev === nowPlayingMovies.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setShownMovie((prev) =>
      prev === 0 ? nowPlayingMovies.length - 1 : prev - 1
    );
  };

  return (
    <Box padding="40px" paddingBottom="60px" backgroundColor="#E9E9E9">
      <Text fontSize="50px" fontWeight="bold" mb="2" align="center">
        Ahora en cines
      </Text>
      <Flex align="center" direction="row" justifyContent="center" gap="30px">
        <Button onClick={handlePrev}>◀️</Button>

        <Box w="300px" h="400px" m="2">
          <Button
            key={shownMovie.id}
            onClick={() => setShownMovieDetails(nowPlayingMovies[shownMovie])}
            variant="unstyled"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${nowPlayingMovies[shownMovie]?.poster_path}`}
              alt={nowPlayingMovies[shownMovie]?.title}
            />
          </Button>
        </Box>
        <Button onClick={handleNext}>▶️</Button>
      </Flex>
    </Box>
  );
};

NowPlaying.propTypes = {
  setShownMovieDetails: PropTypes.func.isRequired,
  movieService: PropTypes.object.isRequired,
};

export default NowPlaying;
