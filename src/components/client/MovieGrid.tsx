import { Grid } from "@mui/material";
import { Movie } from "../../api/MovieAPI";
import MovieItem from "./MovieItem";

interface Props {
  movies: Movie[];
}

const MovieGrid = ({ movies }: Props) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {movies.map((movie) => (
        <Grid item xs={6} sm={4} md={3} key={movie.id}>
          <MovieItem movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
