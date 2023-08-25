import { PaletteMode } from '@mui/material';

export interface IContainer {
  header?: string;
  children?: any;
}

export interface IThemeModeSlice {
  themeMode: string;
}

export interface IUserSlice {
  user: any;
  listFavorites: Array<any>;
}

export interface IGlobalLoadingSlice {
  globalLoading: boolean;
}

export interface IauthModalSlice {
  authModalOpen: boolean;
}
export interface IappState {
  appState: string;
}
export interface IMenu {
  menuItems: {
    display: string;
    path: string;
    icon?: any;
    state: string;
  }[];
}
export interface IThemeModes {
  dark: string;
  light: string;
}

export interface IMode {
  mode: PaletteMode | undefined;
}

// ui.configs.ts start
export interface IUIConfigs {
  style: any;
  size: any;
}
export interface IStyle {
  gradientBgImage: object;
  horizontalGradientBgImage: object;
  typoLines: object;
  mainContent: object;
}
export interface ISize {
  sidebarWith: string;
  contentMaxWidth: string;
}
export interface ITypoLines {
  textAlign: string;
  display: string;
  overflow: string;
  WebkitBoxOrient: string;
  WebkitLineClamp: number;
}
export interface IBackgroundImage {
  position: string;
  backgroundSize: string;
  backgroundPosition: string;
  backgroundColor: string;
  backgroundImage: string;
}
export interface IMaincontent {
  maxWidth: string;
  margin: string;
  padding: number;
}

// ui.configs.ts end

// api/moduls/user.api.ts
export interface IUserSignin {
  username: string;
  password: string;
}
export interface IUserSignup {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  profile: string;
}

export interface IUserPasswordUpdate {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUserEndpoints {
  signin: string;
  signup: string;
  getInfo: string;
  passwordUpdate: string;
}

// api/moduls/reviee.api.ts
export interface IReviewEndpoints {
  list: string;
  add: string;
  remove: (val: any) => string;
}

export interface IReviewadd {
  mediaId: number;
  mediaType: string;
  mediaTitle: string;
  mediaPoster: string;
  content: string;
  contentstyle: any;
}
export interface IReviewID {
  reviewId: number;
}

// api/moduls/persons.api.ts
export interface IpersonEndpoints {
  detail: (val: any) => string;
  medias: (val: any) => string;
}
export interface IpersonID {
  personId: any;
}
// api/moduls/media.api.ts
export interface ImediaEndpoints {
  list: (val: any) => string;
  detail: (val: any) => string;
  search: (val: any) => string;
}

export interface IMediaGetList {
  mediaType: string;
  mediaCategory: string;
  page: number;
}
export interface IMediaGetDetail {
  mediaType?: string;
  mediaId?: string;
}
export interface IMediaSearch {
  mediaType: string;
  query: string;
  page: number;
}
// api/moduls/genre.api.ts

export interface IgenreEndpoints {
  list: (val: any) => string;
}
export interface IGenreGetList {
  mediaType?: string;
}

// api/moduls/favorite.api.ts
export interface IfavoriteEndpoints {
  list: string;
  add: string;
  remove: (val: any) => string;
}
export interface IfavoriteAdd {
  mediaId: number;
  mediaType: string;
  mediaTitle: string;
  mediaPoster: string;
  mediaRate: number;
}
export interface IfavoriteID {
  favoriteId: number;
}

export interface ICircularRateProps {
  value: number;
}
export interface IImageHeader {
  imgPath: string;
}
export interface ICastSlide {
  casts: Array<any>;
}
export interface IMediaGrid {
  medias: Array<any>;
  mediaType: string;
}
export interface IMediaSlide {
  mediaType: string;
  mediaCategory: string;
}
export interface ITextAvatar {
  text: string;
}
export interface ISidebar {
  open: boolean;
  toggleSidebar: Function;
}
export interface ISignForm {
  switchAuthState: Function;
}
export interface ISignuphandleSlider {
  event: Event;
  value: number;
}
export interface IScrollAppbar {
  children?: any;
  window?: any;
}
export interface IRecommendSlide {
  medias: Array<any>;
  mediaType: string;
}
export interface IMediaVideo {
  video: any;
}
export interface IMediaVideosSlide {
  videos: Array<any>;
}
export interface IPageWrapper {
  state: string;
  children?: any;
}
export interface IMediaItem {
  media: any;
  mediaType: string;
}
export interface IHeroSlide {
  mediaType: string;
  mediaCategory: string;
}
export interface IReviewItem {
  review: any;
  onRemoved: Function;
}
export interface IMediaReview {
  reviews: [];
  media: any;
  mediaType: string;
}

export interface IUserprofile {
  cropperOpen: boolean;
  img: any;
  zoom: number;
  croppedImg: string;
}
export interface IEditorProfile {
  editor: any;
}
export interface IcheckfavoriteUtils {
  listFavorites: [];
  mediaId: number;
}
export interface IfavoriteUtils {
  check: Function;
}
export interface IFavoriteItem {
  media: any;
  onRemoved: Function;
}
export interface IFavoriteList {
  id: number;
  mediaId: string;
  mediaType: string;
}

export interface IPersonprops {
  name: string;
  birthday: string;
  deathday: string;
  biography: string;
  profile_path: string;
}
