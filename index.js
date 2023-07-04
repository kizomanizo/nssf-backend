// Imports
import Express from "express";
import { config } from "dotenv";
config();
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

// Constants
const app = Express();
const port = process.env.PORT || 3000;
const url = process.env.NSSF_URL;

// Uses
app.disable("x-powered-by");
app.use(Express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ exposedHeaders: ["x-auth-token"] }));

// Routes
app.get("/nssf/:memberId", async function checkBalance(req, res, next) {
  try {
    const memberId = req.params.memberId;
    const response = await axios.post(url, {
      MemberId: memberId,
    });
    if (response.data.length === 0) {
      res
        .status(400)
        .json({ status: 400, success: false, message: "Invalid Member ID." });
    }
    res
      .status(200)
      .json({ status: 200, success: true, message: response.data });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: false, message: error.message });
  }
});

// App Init
app.listen(port, () => {
  console.log(`NSSF Balances app is up on port ${port}`);
});
