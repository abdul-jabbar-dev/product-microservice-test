import express from "express";
import ENV from "./config/ENV";

const app = express();
app.use(express.json());

/* 

  {
token:""

  }


*/
app.get("/verify");

const port = ENV.PORT;
app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
