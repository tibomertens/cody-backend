const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["cody-api-key"];
  console.log(apiKey);
  
  if (!apiKey || apiKey !== process.env.CODY_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = { verifyApiKey };
