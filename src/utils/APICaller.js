//Cho Product và Post
import axios from "axios";
import * as Config from "./Config";
export default function APICaller(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
  })
};