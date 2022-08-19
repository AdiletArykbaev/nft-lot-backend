import axios from "axios";

const myUrl =
  "https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG";

export const getData = async (url = myUrl) => {
  const res = await axios.get(myUrl);
  return res.data;
};
