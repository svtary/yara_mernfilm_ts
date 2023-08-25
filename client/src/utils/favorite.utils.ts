import { IcheckfavoriteUtils } from "../types/interfaces";
import { IfavoriteUtils } from "../types/interfaces";
const favoriteUtils: IfavoriteUtils = {
  check: ({ listFavorites, mediaId }: IcheckfavoriteUtils) =>
    listFavorites &&
    listFavorites.find((e) => e["mediaId"] === mediaId) !== undefined,
};

export default favoriteUtils;
