import privateClient from '../client/private.client';
import { IReviewEndpoints } from '../../types/interfaces';
import { IReviewadd } from '../../types/interfaces';
import { IReviewID } from '../../types/interfaces';

const reviewEndpoints: IReviewEndpoints = {
  list: 'reviews',
  add: 'reviews',
  remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    content,
    contentstyle,
  }: IReviewadd) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
        contentstyle,
      });
      console.log('apiresponse', response);

      return { response };
    } catch (err: any) {
      console.log('apiresponseerrr', err);
      return { err };
    }
  },
  remove: async ({ reviewId }: IReviewID) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({ reviewId })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);
      console.log('getlist', response);

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
};

export default reviewApi;
