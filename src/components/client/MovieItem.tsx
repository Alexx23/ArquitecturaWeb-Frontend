import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../api/MovieAPI";
import uiConfigs from "../../configs/ui.configs";
import { getImageUrl } from "../../utils/RandomImage";

interface Props {
  movie: Movie;
}

const MovieItem = ({ movie }: Props) => {
  return (
    <Link to={"/movies/" + movie.id}>
      <Box
        sx={{
          borderRadius: "5px",
          ...uiConfigs.style.backgroundImage(getImageUrl(movie.id)),
          paddingTop: "160%",
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText",
        }}
      >
        <>
          <Box
            className="media-back-drop"
            sx={{
              opacity: { xs: 1, md: 0 },
              transition: "all 0.3s ease",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
            }}
          />

          <Box
            className="media-info"
            sx={{
              transition: "all 0.3s ease",
              opacity: { xs: 1, md: 0 },
              position: "absolute",
              bottom: { xs: 0, md: "-20px" },
              width: "100%",
              height: "max-content",
              boxSizing: "border-box",
              padding: { xs: "10px", md: "2rem 1rem" },
            }}
          >
            <Stack spacing={{ xs: 1, md: 2 }}>
              <Typography>{movie.year}</Typography>

              <Typography
                variant="body1"
                fontWeight="700"
                sx={{
                  fontSize: "1rem",
                  ...uiConfigs.style.typoLines(1, "left"),
                }}
              >
                {movie.name}
              </Typography>
            </Stack>
          </Box>
        </>
      </Box>
    </Link>
  );
};

export default MovieItem;
