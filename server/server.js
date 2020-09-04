const express = require("express");
const path = require("path");
const app = express();
const { cloudinary } = require("./utils/cloudinary");

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/public")));
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "frontend/public/index.html")));
  });
}

app.use(express.static("../frontend/public"));
