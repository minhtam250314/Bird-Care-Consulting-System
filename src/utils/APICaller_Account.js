import axios from "axios";
import * as Config from "./Config";
export default function APICaller_Account(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${Config.API_URL_Account}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  })
};