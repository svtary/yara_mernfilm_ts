import publicClient from "../client/public.client";
import { IpersonEndpoints } from "../../types/interfaces";
import { IpersonID } from "../../types/interfaces";

const personEndpoints: IpersonEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  detail: async ({ personId }: IpersonID) => {
    try {
      const response = await publicClient.get(
        personEndpoints.detail({ personId })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  medias: async ({ personId }: IpersonID) => {
    try {
      const response = await publicClient.get(
        personEndpoints.medias({ personId })
      );

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
};

export default personApi;
