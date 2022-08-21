import { getData } from "../Utils/getData.js";

export const getWinner = async (req, res) => {
  const date = new Date();
  const today = date.getDay();
  if (today == 3) {
    res.json({
      message: "лотеряя началась!",
    });
    
  }
  res.json({
    message: "Лотеряя не началась!",
  });
};
