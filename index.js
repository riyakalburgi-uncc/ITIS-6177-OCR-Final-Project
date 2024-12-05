//Import libraries
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const endpoint = process.env.AZURE_VISION_ENDPOINT;
const apiKey = process.env.AZURE_VISION_KEY;
const location = process.env.AZURE_VISION_LOCATION;

// OCR API calls
app.post("/read-image", async (req, res) => {
  const { image_url } = req.body;

  if (!image_url) {
    return res
      .status(400)
      .json({ error: "image_url is required in the request body." });
  }

  try {
    const analyzeResponse = await axios.post(
      `${endpoint}/vision/v3.2/read/analyze`,
      { url: image_url },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
          "Ocp-Apim-Subscription-Region": location,
          "Content-Type": "application/json",
        },
      }
    );

    const operationLocation = analyzeResponse.headers["operation-location"];

    let result;
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const operationResult = await axios.get(operationLocation, {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
      });
      if (operationResult.data.status === "succeeded") {
        result = operationResult.data;
        break;
      } else if (operationResult.data.status === "failed") {
        return res.status(500).json({ error: "Failure of OCR processing." });
      }
    }

    if (!result) {
      return res.status(408).json({ error: "Timed out while OCR processing." });
    }

    res.status(200).json(result.analyzeResult.readResults);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(error.response?.status || 500).json({
      error:
        error.response?.data || "Image could not be processed.",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://134.209.45.33:${port}`);
});
