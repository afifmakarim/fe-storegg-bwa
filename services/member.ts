import callApi from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const getMemberOverview = async () => {
  const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;
  return callApi({
    url,
    method: "GET",
    token: true,
  });
};

export const getMemberTransactions = async (valueParams: string) => {
  let params = "";

  if (valueParams === "all") {
    params = "";
  } else {
    params = `?status=${valueParams}`;
  }

  const url = `${ROOT_API}/${API_VERSION}/players/history${params}`;
  return callApi({
    url,
    method: "GET",
    token: true,
  });
};

export const getTransactionDetail = async (id: string, token: string) => {
  const url = `${ROOT_API}/${API_VERSION}/players/history/${id}/detail`;
  return callApi({
    url,
    method: "GET",
    serverToken: token,
  });
};

export const updateProfile = async (data: FormData, id: string) => {
  const url = `${ROOT_API}/${API_VERSION}/players/profile/${id}`;
  return callApi({
    url,
    method: "PUT",
    data,
    token: true,
  });
};
