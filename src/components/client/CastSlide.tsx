import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Actor } from "../../api/ActorAPI";
import uiConfigs from "../../configs/ui.configs";
import { getAvatarUrl } from "../../utils/RandomImage";

interface Props {
  actors: Actor[];
}

const CastSlide = ({ actors }: Props) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {actors.map((actor) => (
          <SwiperSlide key={actor.id}>
            <Box
              sx={{
                paddingTop: "120%",
                color: "text.primary",
                ...uiConfigs.style.backgroundImage(getAvatarUrl(actor.id)),
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "max-content",
                  bottom: 0,
                  padding: "10px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              >
                <Typography
                  color={"#fff"}
                  sx={{ ...uiConfigs.style.typoLines(1, "left") }}
                >
                  {actor.name}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
