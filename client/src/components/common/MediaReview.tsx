import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Avatar,
  ButtonGroup,
} from '@mui/material';
import {
  MuiColorInput,
  MuiColorInputValue,
  MuiColorInputFormat,
} from 'mui-color-input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Container from './Container';
import reviewApi from '../../api/modules/review.api';
// import TextAvatar from "./TextAvatar";
import { useAppSelector } from '../../hooks/hooksRedux';
import { IReviewItem } from '../../types/interfaces';
import { IMediaReview } from '../../types/interfaces';

const ReviewItem = ({ review, onRemoved }: IReviewItem) => {
  const { user } = useAppSelector((state) => state.user);
  console.log('wodreview', review);
  // console.log('wodeyangshine', review.contentstyle[0].style);

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({
      reviewId: review.id,
    });

    if (err) toast.error(err.message);
    if (response) onRemoved(review.id);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: '5px',
        position: 'relative',
        opacity: onRequest ? 0.6 : 1,
        '&:hover': { backgroundColor: 'background.paper' },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        {/* <TextAvatar text={review.user.displayName} /> */}
        <Avatar alt="" src={review.user.profile} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.user.displayName}
              {/* <Avatar alt="" src={user.profile} /> */}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            textAlign="justify"
            // classes={contentstyle}
          >
            <p style={review.contentstyle.style}>{review.content}</p>
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                right: { xs: 0, md: '10px' },
                marginTop: { xs: 2, md: 0 },
                width: 'max-content',
              }}
            >
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }: IMediaReview) => {
  const { user } = useAppSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([] as Array<any>);
  const [filteredReviews, setFilteredReviews] = useState([] as Array<any>);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState('');
  const [reviewCount, setReviewCount] = useState(0);

  const [fontcolorValue, setfontcolorValue] =
    useState<MuiColorInputValue>('#ffffff');

  const format: MuiColorInputFormat = 'hex';

  const [fontWeight, setfontWeight] = useState('normal');
  const [fontWeightcls, setfontWeightcls] = useState(false);
  const [fontStylecls, setfontStylecls] = useState(false);
  const [fontStyle, setfontStyle] = useState('normal');
  const [textdecorationcls, settextdecorationcls] = useState(false);
  const [textdecoration, settextdecoration] = useState('none');
  const [fontsize, setfontsize] = useState('100%');
  const [fontfamily, setfontfamily] = useState('Arial');
  const contentstyle = {
    'style': {
      'color': fontcolorValue as string,
      'fontWeight': fontWeight,
      'fontStyle': fontStyle,
      'textDecoration': textdecoration,
      'fontSize': fontsize,
      'lineHeight': 'normal',
      'fontFamily': fontfamily,
    },
  };

  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
      content,
      contentstyle: contentstyle,
    };
    console.log('body', body);

    const { response, error }: any = await reviewApi.add(body);
    console.log('reviewresponse', response);

    setOnRequest(false);

    if (error) toast.error(error.message);
    if (response) {
      toast.success('Post review success');

      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent('');
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id: number) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success('Remove review success');
  };

  const onfontcolorChange = (newValue: string) => {
    setfontcolorValue(newValue);
  };
  const onTextdecoration = () => {
    settextdecorationcls(!textdecorationcls);
    if (textdecorationcls) {
      settextdecoration('underline');
    } else {
      settextdecoration('none');
    }
  };
  const onAddbold = () => {
    setfontWeightcls(!fontWeightcls);
    if (fontWeightcls) {
      console.log('in bold');
      setfontWeight('bold');
    } else {
      setfontWeight('normal');
      console.log('in normal');
    }
  };
  const onAddfontstyle = () => {
    setfontStylecls(!fontStylecls);
    if (fontStylecls) {
      setfontStyle('italic');
    } else {
      setfontStyle('normal');
    }
  };
  const handleChangeFontsize = (event: SelectChangeEvent) => {
    setfontsize(event.target.value as string);
  };

  const handleChangeFontfamily = (event: SelectChangeEvent) => {
    setfontfamily(event.target.value as string);
  };

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              {/* <TextAvatar text={user.displayName} /> */}
              <Avatar alt="" src={user.profile} />
              {/* {user.profile !== null && <Avatar alt="" src={user.profile} />} */}
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                  {/* <Avatar alt="" src={user.profile} /> */}
                </Typography>
                {/* 设置字体样式 */}

                <ButtonGroup variant="text" aria-label="text button group">
                  <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-select-small">SIZE</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      // value="fontsize"
                      label="SIZE"
                      onChange={handleChangeFontsize}
                    >
                      <MenuItem value={'2em'}>H1</MenuItem>
                      <MenuItem value={'1.5em'}>H2</MenuItem>
                      <MenuItem value={'1.17em'}>H3</MenuItem>
                      <MenuItem value={'1em'}>H4</MenuItem>
                      <MenuItem value={'0.83em'}>H5</MenuItem>
                      <MenuItem value={'0.75em'}>H6</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-select-small">FONT</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      // value="fontsize"
                      label="FONT"
                      onChange={handleChangeFontfamily}
                    >
                      <MenuItem value={'Arial'}>Arial</MenuItem>
                      <MenuItem value={'Verdana'}>Verdana</MenuItem>
                      <MenuItem value={'Times New Roman'}>
                        Times New Roman
                      </MenuItem>
                      <MenuItem value={'SimSun'}>宋体</MenuItem>
                      <MenuItem value={'Microsoft YaHei'}>微软雅黑</MenuItem>
                      <MenuItem value={'STKaiti'}>华文楷体</MenuItem>
                    </Select>
                  </FormControl>
                  <MuiColorInput
                    value={fontcolorValue}
                    onChange={onfontcolorChange}
                    format={format}
                  />
                  <Button>
                    <i className="fa-solid fa-bold" onClick={onAddbold}></i>
                  </Button>
                  <Button>
                    <i
                      className="fa-solid fa-italic"
                      onClick={onAddfontstyle}
                    ></i>
                  </Button>{' '}
                  <Button>
                    <i
                      className="fa-solid fa-underline"
                      onClick={onTextdecoration}
                    ></i>
                  </Button>{' '}
                </ButtonGroup>
                {/* 设置字体样式完毕 */}
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                  inputProps={contentstyle}
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: 'max-content' }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default MediaReview;
