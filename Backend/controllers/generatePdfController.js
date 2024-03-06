const puppeteer = require("puppeteer");
const fs = require("fs");

exports.generatePdfController = async (req, res) => {
  try {
    const district = req.body.district;
    const historicalData = req.body.historicalData;
    const pdfBuffer = await generatePDF(district, historicalData);
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", "attachment; filename=districts.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};

async function generatePDF(district, historicalData) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Construct HTML content dynamically based on highlightedDistrict
  let htmlContent = `<html><body><h1>Attractions in ${district}</h1><ul>`;
  console.log(historicalData);
  for (const data of historicalData) {
    htmlContent += `<li>${data}</li>`;
  }
  htmlContent += `</ul></body></html>`;

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf();
  await browser.close();
  return pdfBuffer;
}
