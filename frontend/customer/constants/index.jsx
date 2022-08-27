import Cookies from "js-cookie";
const headerOptions = {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  customer = Cookies.get("token"),
  baseUrl = "https://api.balushai.com"

  
export {
  headerOptions,
  baseUrl,
  customer
};
