// components/ReviewSection.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  Textarea,
  Input,
  Flex,
  Heading,
  Avatar,
  Badge,
  Stack,
} from "@chakra-ui/react";

const ReviewSection = ({ movieId, user }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/reviews/${movieId}`);
      setReviews(res.data.reviews);
      setAvgRating(res.data.avgRating.toFixed(1));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Submit review
  const submitReview = async () => {
    if (!rating || !comment.trim()) return;

    try {
      await axios.post(
        `/api/reviews/${movieId}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setComment("");
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Box mt={10}>
      {/* Average Rating */}
      <Heading size="lg">User Reviews</Heading>
      <Text fontSize="xl" mt={2}>
        ⭐ Average Rating: {avgRating}/10
      </Text>

      {/* Review Form */}
      {user ? (
        <Box mt={6} p={4} borderWidth="1px" rounded="lg">
          <Text fontWeight="bold" mb={2}>
            Your Rating (1–10)
          </Text>

          <Input
            type="number"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            w="120px"
            mb={3}
          />

          <Textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            mb={3}
          />

          <Button colorScheme="purple" onClick={submitReview}>
            Submit Review
          </Button>
        </Box>
      ) : (
        <Text mt={4} color="gray.500">
          Login to write a review.
        </Text>
      )}

      {/* Review List */}
      <Stack mt={8} spacing={4}>
        {loading ? (
          <Text>Loading reviews...</Text>
        ) : reviews.length === 0 ? (
          <Text>No reviews yet. Be the first to write one!</Text>
        ) : (
          reviews.map((r) => (
            <Box key={r._id} p={4} borderWidth="1px" rounded="lg">
              <Flex align="center" mb={2}>
                <Avatar name={r.username} size="sm" mr={3} />
                <Box>
                  <Text fontWeight="bold">{r.username}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(r.createdAt).toLocaleString()}
                  </Text>
                </Box>

                <Badge ml="auto" colorScheme="yellow" fontSize="md">
                  ⭐ {r.rating}
                </Badge>
              </Flex>

              <Text>{r.comment}</Text>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default ReviewSection;
