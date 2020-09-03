import "../sass/app.scss";
var cloudinary = require("cloudinary-core");

var cl = new cloudinary.Cloudinary({
  cloud_name: "kuenyehiaprize",
  secure: true,
});

const d = async () => {
  try {
    const res = await fetch("/api/images");
    const data = await res.json();
    const imgarray = data.map((image) => {
      var tag = cl.imageTag(image);
      console.log(tag);
      let img = document.querySelector(".images");
      img.innerHTML += tag.toHtml();
    });
  } catch (err) {
    console.log(err);
  }
};

d();
