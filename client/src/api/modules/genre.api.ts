import publicClient from "../client/public.client";
import { IgenreEndpoints } from "../../types/interfaces";
import { IGenreGetList } from "../../types/interfaces";

const genreEndpoints: IgenreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }: IGenreGetList) => {
    try {
      const response = await publicClient.get(
        genreEndpoints.list({ mediaType })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
};

export default genreApi;
