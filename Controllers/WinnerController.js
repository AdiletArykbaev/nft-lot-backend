import { getData } from "../Utils/getData.js";

export const getWinner = async (req, res) => {
  const result = await getData();
  res.send(result);
};
