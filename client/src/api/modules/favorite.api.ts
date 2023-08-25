import privateClient from "../client/private.client";
import { IfavoriteEndpoints } from "../../types/interfaces";
import { IfavoriteAdd } from "../../types/interfaces";
import { IfavoriteID } from "../../types/interfaces";

const favoriteEndpoints: IfavoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list);

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate,
  }: IfavoriteAdd) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  remove: async ({ favoriteId }: IfavoriteID) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
};

export default favoriteApi;
