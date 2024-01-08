import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Container from "./Container";
import { Movie } from "../../api/MovieAPI";
import CommentAPI, { Comment, CommentCreate } from "../../api/CommentAPI";
import { formatDate } from "../../utils/DateUtils";
import { useUser } from "../../context/UserContext";
import { getAvatarUrl } from "../../utils/RandomImage";
import useComments from "../../hooks/useComments";
import { publish } from "../../utils/CustomEvents";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteModal from "../modals/DeleteModal";
import { set } from "react-hook-form";

interface PropsItem {
  comment: Comment;
  onDelete: (comment: Comment) => void;
}
const CommentItem = ({ comment, onDelete }: PropsItem) => {
  const { user } = useUser();

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        <img
          className="w-10 h-10 rounded-full"
          src={getAvatarUrl(comment.user.id)}
          alt="User photo"
        />
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {comment.user.name}
            </Typography>
            <Typography variant="caption">
              {formatDate(new Date(comment.created_at))}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {comment.content}
          </Typography>
          {user && user.id === comment.user.id && (
            <button
              onClick={() => onDelete(comment)}
              type="button"
              className="w-28 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Eliminar
            </button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

interface Props {
  movie: Movie;
}

const MovieComment = ({ movie }: Props) => {
  const { user } = useUser();

  const {
    comments,
    nextPage,
    totalSize,
    isLoading,
    fetchNext,
    setComments,
    setTotalSize,
  } = useComments(movie.id, true);

  const [content, setContent] = useState("");
  const [deleteComment, setDeleteComment] = useState<Comment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateComment = async () => {
    if (isCreating) return;
    setIsCreating(true);

    const commentRequest: CommentCreate = {
      movie_id: movie.id,
      content: content,
    };

    CommentAPI.createComment(commentRequest)
      .then((res) => {
        publish("showSuccessMessage", "Comentario publicado correctamente");
        setContent("");
        setComments([res, ...comments]);
        setTotalSize(totalSize + 1);
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  const handleDeleteComment = () => {
    if (isDeleting) return;
    setIsDeleting(true);
    CommentAPI.deleteComment(deleteComment!.id)
      .then((res) => {
        publish("showSuccessMessage", "Comentario eliminado correctamente");
        const newComments = comments.filter(
          (item) => item.id !== deleteComment!.id
        );
        setComments(newComments);
        setTotalSize(totalSize - 1);
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      })
      .finally(() => {
        setDeleteComment(null);
        setIsDeleting(false);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container header={`Comentarios`}>
          <div className="inline flex">
            <Loading color="fill-teal-500" size="h-6" />
            <span className="ml-2">Cargando comentarios...</span>
          </div>
        </Container>
      ) : (
        <Container header={`Comentarios (${totalSize})`}>
          <Stack spacing={4} marginBottom={2}>
            {comments.map((item) =>
              item.user ? (
                <Box key={item.id}>
                  <CommentItem comment={item} onDelete={setDeleteComment} />
                  <Divider
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  />
                </Box>
              ) : null
            )}
            <div className="text-center mb-8">
              {nextPage > 1 && (
                <button
                  onClick={fetchNext}
                  className="max-w-lg justify-center w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? (
                    <Loading color="fill-teal-500" size="h-6" />
                  ) : (
                    <FontAwesomeIcon icon="plus" className="mr-2 w-4 h-4" />
                  )}
                  CARGAR MÁS COMENTARIOS
                </button>
              )}
            </div>{" "}
          </Stack>
          {user && (
            <>
              <Divider />
              <Stack direction="row" spacing={2}>
                <img
                  className="w-10 h-10 rounded-full"
                  src={getAvatarUrl(user.id)}
                  alt="User photo"
                />{" "}
                <Stack spacing={2} flexGrow={1}>
                  <Typography variant="h6" fontWeight="700">
                    {user.name}
                  </Typography>
                  <TextField
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    rows={4}
                    placeholder="Escribe tu comentario"
                    variant="outlined"
                  />
                  <button
                    onClick={handleCreateComment}
                    className="w-28 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isCreating ? (
                      <Loading color="fill-teal-500" size="h-6 w-6" />
                    ) : (
                      <FontAwesomeIcon icon="paper-plane" className="mr-2" />
                    )}
                    Publicar
                  </button>
                </Stack>
              </Stack>
            </>
          )}
        </Container>
      )}
      <DeleteModal
        show={deleteComment != null}
        onClose={() => setDeleteComment(null)}
        onDelete={() => handleDeleteComment()}
      />
    </>
  );
};

export default MovieComment;
