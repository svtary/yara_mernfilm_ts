import * as React from 'react';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import mediaApi from '../../api/modules/media.api';
import AutoSwiper from './AutoSwiper';
import { toast } from 'react-toastify';
import MediaItem from './MediaItem';
import { IMediaSlide } from '../../types/interfaces';

const MediaSlide = ({ mediaType, mediaCategory }: IMediaSlide) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err }: any = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      console.log('zaimediaslide', response);
      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
