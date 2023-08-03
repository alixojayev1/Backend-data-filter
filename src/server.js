import express from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";

const expres = express();
expres.use(express.json());

expres.get("/user", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "user.json"))
  );
  return res.send(data);
});
expres.get("/order", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "order.json"))
  );
  return res.send(data);
});
expres.get("/product", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "product.json"))
  );
  return res.send(data);
});
expres.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "user.json"))
  );

  const data2 = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "order.json"))
  );

  const data3 = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "product.json"))
  );

  console.log(data3);

  const newData = data.find((e) => e.id == id);
  newData.array = [];
  const newOrder = data2.filter((e) => e.user_id == id);
  data3.filter((e) => {
    for (const i of newOrder) {
      if (e.id == i.product_id) {
        newData.array.push(i);
      }
    }
  });

  return res.send(newData);
});

expres.listen(process.env["PORT"], console.log("create server 2000"));
