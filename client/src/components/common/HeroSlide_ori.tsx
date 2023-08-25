import * as React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/hooksRedux';

import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { routesGen } from '../../routes/routes';

import uiConfigs from '../../configs/ui.configs';

import CircularRate from './CircularRate';

import tmdbConfigs from '../../api/configs/tmdb.configs';
import genreApi from '../../api/modules/genre.api';
import mediaApi from '../../api/modules/media.api';
import { IHeroSlide } from '../../types/interfaces';
import { useAppSelector } from '../../hooks/hooksRedux';
import Skeleton from '@mui/material/Skeleton';

const HeroSlide = ({ mediaType, mediaCategory }: IHeroSlide) => {
  const { globalLoading } = useAppSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const genresLabels = (genreId: number) => {
    const sameGenresId = genres.find((e: any) => e.id === genreId);
    if (sameGenresId) {
      return sameGenresId['name'];
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err }: any = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err }: any = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: 'relative',
        // display: 'flex',
        // alignItems: 'center',
        color: 'primary.contrastText',
        '&::before': {
          content: '""',
          width: '100%',
          height: '30%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        // modules={[Autoplay]}
        style={{
          width: '100%',
          height: 'max-content',
          // display: 'flex',
          // justifyContent: 'flex-start',
          // alignItems: 'center',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie: any, index: number) => (
          <SwiperSlide key={index}>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: '30%' }}></div>
              </Skeleton>
            ) : (
              <Box
                sx={{
                  paddingTop: {
                    xs: '130%',
                    sm: '80%',
                    md: '60%',
                    lg: '45%',
                  },
                  backgroundPosition: 'top',
                  backgroundSize: 'cover',
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    movie.backdrop_path || movie.poster_path
                  )})`,
                }}
              />
            )}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                paddingX: { sm: '10px', md: '5rem', lg: '10rem' },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingX: '30px',
                  color: 'text.primary',
                  width: { sm: 'unset', md: '30%', lg: '40%' },
                }}
              >
                <Stack spacing={4} direction="column">
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, 'left'),
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* title */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}
                    <CircularRate value={movie.vote_average} />
                    {/* rating */}

                    <Divider orientation="vertical" />
                    {/* genres */}
                    {[...movie.genre_ids]
                      .splice(0, 2)
                      .map((genreId: number, index: number) => (
                        <Chip
                          variant="filled"
                          color="primary"
                          key={index}
                          label={genresLabels(genreId)}
                        />
                      ))}
                    {/* genres */}
                  </Stack>

                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: 'max-content' }}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
