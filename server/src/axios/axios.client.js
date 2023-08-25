import axios from "axios";

const get = async (url) => {
  console.log("getusr", url);
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "identity",
    },
  });
  // console.log("response.data", response.data);
  return response.data;
};

export default { get };
