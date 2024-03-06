const { pool } = require("../database/config");

exports.okresController = async (req, res) => {
  try {
    const { coordinate } = req.body; // { coordinate: [lng, lat] }

    const wktPoint = `POINT(${coordinate.join(" ")})`; // Convert to WKT format
    const query = {
      text: "SELECT public.getokres(ST_GeomFromText($1, 3857)) AS info",
      values: [wktPoint],
    };

    const { rows } = await pool.query(query);
    if (rows[0].info) {
      res.status(200).json(rows[0].info);
    } else {
      res.status(200).send("No district found for this location.");
    }
  } catch (error) {
    console.error("Error querying the database:", error.stack);
    res.status(500).send("Internal Server Error");
  }
};
