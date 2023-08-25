import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { ImediaEndpoints } from "../../types/interfaces";
import { IMediaGetList } from "../../types/interfaces";
import { IMediaGetDetail } from "../../types/interfaces";
import { IMediaSearch } from "../../types/interfaces";

const mediaEndpoints: ImediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }: IMediaGetList) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId }: IMediaGetDetail) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  search: async ({ mediaType, query, page }: IMediaSearch) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
};

export default mediaApi;
