const express = require("express");
var cors = require("cors");
const app = express();
const { cloudinary } = require("./utils/cloudinary");

app.use(cors());

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:samples/people")
    .sort_by("public_id", "desc")
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`successfully connected to port ${port}`);
});
