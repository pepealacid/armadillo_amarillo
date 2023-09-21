import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UnknownUser from "../assets/images/unknown.jpeg";
import PropTypes from "prop-types";

const Credits = ({ movie, movieService }) => {
  const [credits, setCredits] = useState();

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const result = await movieService.getMovieCredits(movie.id);
        setCredits(result);
      } catch (error) {
        console.error("Error fetching Now Playing movies:", error);
      }
    };

    fetchMovieCredits();
  }, [movie]);

  return (
    <Box>
      <Box position="relative" w="100vw" h="500px" overflow="hidden" mb="4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          w="100%"
          h="auto"
          objectFit="cover"
          objectPosition="50% 50%"
        />
        <Text
          position="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          color="white"
          px="4"
          py="2"
          fontWeight="bold"
          whiteSpace="nowrap"
          fontSize="30px"
          style={{
            textShadow: "2px 0px 0px black", // Added text shadow
          }}
        >
          {movie.title}
        </Text>
      </Box>

      <Box display="flex" alignItems="center">
        <Box>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            display="inline-block"
            mr="2"
            w="150px"
            borderRadius="20px"
            marginLeft="20px"
          />
        </Box>
        <Box marginLeft="20px">
          <Text fontSize="lg" fontWeight="bold">
            {movie.title}
          </Text>
          <Text>{movie.original_title}</Text>
          <Text>&#9734; {movie.vote_average}</Text>
        </Box>
      </Box>
      <Box>
        <Text fontSize="20px" margin="30px">
          {movie.overview}
        </Text>
      </Box>
      {credits && (
        <Box marginLeft="30px">
          <Text fontSize="50px" fontWeight="bold" mb="2">
            Cast
          </Text>
          <Flex overflowX="auto">
            <Box display="flex">
              {credits.cast.map((actor) => (
                <Box>
                  <Box w="150px" h="200px">
                    <Image
                      key={actor.id}
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                          : UnknownUser
                      }
                      alt={actor.name}
                      mr="2"
                      padding="20px"
                    />
                  </Box>
                  <Box>
                    <Text align="center">{actor.name}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Flex>
          <Text fontSize="50px" fontWeight="bold" mb="2">
            Crew
          </Text>
          <Flex overflowX="auto">
            <Box display="flex">
              {credits.crew
                .reduce((acc, crew) => {
                  if (!acc.some((member) => member.id === crew.id)) {
                    acc.push(crew);
                  }
                  return acc;
                }, [])
                .sort((a, b) => a.job.localeCompare(b.job))
                .map((crew) => (
                  <Box key={crew.id}>
                    <Box w="150px" h="200px">
                      <Image
                        src={
                          crew.profile_path
                            ? `https://image.tmdb.org/t/p/w500${crew.profile_path}`
                            : UnknownUser
                        }
                        alt={crew.name}
                        mr="2"
                        padding="20px"
                      />
                    </Box>
                    <Box>
                      <Text align="center" fontWeight="bold">
                        {crew.job}
                      </Text>
                      <Text align="center">{crew.name}</Text>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

Credits.propTypes = {
  movie: PropTypes.object.isRequired,
  movieService: PropTypes.object.isRequired,
};

export default Credits;
