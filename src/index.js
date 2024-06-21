const express = require("express");
const cors = require("cors");

const app = express();

const moviesRouter = require("./routers/movies");
const { errorHandler } = require("./utils/errors");

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
    res.send("Server is running...");
});

app.use("/api/movies", moviesRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})
