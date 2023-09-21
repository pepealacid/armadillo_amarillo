import { Flex, Box, Image, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Popular = ({ setShownMovieDetails, movieService }) => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const result = await movieService.getPopularMovies();
        setPopularMovies(result.results);
      } catch (error) {
        console.error("Error fetching Now Playing movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <Box>
      <Text>Populares</Text>
      <Flex overflowX="auto">
        {popularMovies.map((movie) => (
          <Button
            key={movie.id}
            onClick={() => setShownMovieDetails(movie)}
            variant="unstyled"
            w="150px"
            h="200px"
          >
            <Box m="2">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                w="100%"
                h="100%"
                borderRadius="20px"
              />
            </Box>
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

Popular.propTypes = {
  setShownMovieDetails: PropTypes.func.isRequired,
  movieService: PropTypes.object.isRequired,
};

export default Popular;
