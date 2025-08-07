import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT) || 3005;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
