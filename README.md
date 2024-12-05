# ITIS-6177-OCR-Final-Project

# OCR API

The OCR API enables developers to extract printed and handwritten text from images. It supports multi-language text recognition, provides bounding box data for layout analysis, and is optimized for real-time processing.

## Prerequisites
- Node.js installed
- Azure Cognitive Services resource for OCR
- A `.env` file with:
```
  AZURE_VISION_KEY=your-azure-api-key
  AZURE_VISION_ENDPOINT=https://your-resource-name.cognitiveservices.azure.com
  AZURE_VISION_LOCATION=your-location
```
## How to Run
1. Clone this repository on your machine
   ```
   git clone https://github.com/riyakalburgi-uncc/ITIS-6177-OCR-Final-Project.git
   ``` 
2. Install dependencies:
   ```
   npm init
   npm install
   ```
3. Start the server
   ```
   node index.js
   ```
4. Test the API using Postman
   - HTTP Method: POST
   - Endpoint URL: http://134.209.45.33:3000/read-image
   - Request Body:
     ```
     {
        "image_url": "https://drive.google.com/uc?id=14x5Q2Ew01Rtsk0qZT-ugU07KCdcr8VHS"
     }
     ```
## Error Handling
-	400: Ensure that the imageUrl is correct and publicly accessible.
-	408: This happens when processing takes too long. Retry with a smaller image or after some time.
-	500: Likely an issue with server configuration. Contact support or review the deployment.
