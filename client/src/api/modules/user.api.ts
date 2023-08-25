import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { IUserSignin } from "../../types/interfaces";
import { IUserSignup } from "../../types/interfaces";
import { IUserPasswordUpdate } from "../../types/interfaces";
import { IUserEndpoints } from "../../types/interfaces";

const userEndpoints: IUserEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  signin: async ({ username, password }: IUserSignin) => {
    try {
      console.log("send request");
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });

      return { response };
    } catch (err: any) {
      console.log("err");
      return { err };
    }
  },
  signup: async ({
    username,
    password,
    confirmPassword,
    displayName,
    profile,
  }: IUserSignup) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
        profile,
      });

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
  passwordUpdate: async ({
    password,
    newPassword,
    confirmNewPassword,
  }: IUserPasswordUpdate) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (err: any) {
      return { err };
    }
  },
};

export default userApi;
