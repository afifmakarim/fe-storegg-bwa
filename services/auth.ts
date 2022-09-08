import { LoginTypes } from "./data-types/index";
import callApi from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const setSignUp = async (data: FormData) => {
  const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

  return callApi({ url, method: "POST", data });
};

export const setLogin = async (data: LoginTypes) => {
  const url = `${ROOT_API}/${API_VERSION}/auth/signin`;

  return callApi({ url, method: "POST", data });
};
