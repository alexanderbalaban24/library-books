const express = require("express");

const counterApiRouter = require("./routes/api/counter");

const app = express();
app.use("/counter", counterApiRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Counter service running on port: ${PORT}`)
})
