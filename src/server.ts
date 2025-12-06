import app from "./app";
import config from "./config";

const port = config.port;

app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});
