const jwt = require("jsonwebtoken");
const Registry = require('../models/registryModel');

const isOwner = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || token === "null") {
    return res.status(400).json({ message: "Token not found" });
  }

  try {
    const tokenInfo = jwt.verify(token, process.env.SECRET);
    req.user = tokenInfo;

    const goalsId = req.params.goalsId;
    Registry.findById(goalsId)
      .then((goals) => {
        if (!goals) {
          return res.status(404).json({ message: "Goals not found" });
        }

        if (req.user.userId !== goals.creator.toString()) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        
        return next(); 
      }).catch(next);
  } catch (error) {
    console.log(error.message, "Error.message");
    return res.status(401).json(error);
  }
};

module.exports = isOwner;