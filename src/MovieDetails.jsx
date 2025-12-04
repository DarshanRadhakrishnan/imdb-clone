// pages/MovieDetails.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  Spinner,
  Flex,
  Badge,
  Stack,
  Center,
} from "@chakra-ui/react";
import Loader from "../components/Loader";

const MovieDetails = () => {
  const { movieId } = useParams(); // 🔥 movie id from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/movies/${movieId}`); 
      setMovie(res.data);
    } catch (error) {
      console.error("Movie fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;

  if (!movie)
    return (
      <Center h="60vh">
        <Text fontSize="xl" color="red.400">
          Movie not found.
        </Text>
      </Center>
    );

  return (
    <Flex
      p={6}
      gap={10}
      wrap="wrap"
      justify="center"
      align="flex-start"
      maxW="1200px"
      mx="auto"
    >
      {/* Movie Poster */}
      <Box>
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          borderRadius="lg"
          boxShadow="lg"
          w="300px"
        />
      </Box>

      {/* Movie Info */}
      <Box flex="1" minW="300px">
        <Heading mb={3}>{movie.title}</Heading>

        {/* Genre Badges */}
        <Stack direction="row" mb={4} wrap="wrap">
          {movie.genres?.map((g, idx) => (
            <Badge key={idx} colorScheme="purple" p={2} borderRadius="md">
              {g}
            </Badge>
          ))}
        </Stack>

        {/* Rating */}
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          ⭐ Rating: {movie.rating}
        </Text>

        {/* Plot */}
        <Text fontSize="md" mb={4} color="gray.600">
          {movie.plot}
        </Text>

        {/* Cast */}
        <Heading size="md" mt={5} mb={2}>
          Cast
        </Heading>
        <Text color="gray.700">{movie.cast?.join(", ")}</Text>

        {/* Release Year */}
        <Text mt={5} fontSize="md" color="gray.500">
          📅 Released: {movie.year}
        </Text>
      </Box>
    </Flex>
  );
};

export default MovieDetails;
