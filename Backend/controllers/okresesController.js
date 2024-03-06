const { pool } = require('../database/config');

exports.okresesController = async (req, res) => {
    try {
        const { polygon } = req.body;
  
        if (!polygon) {
            return res.status(400).send({ error: 'Polygon geometry is required.' });
        }
  
        const wktPolygon = 'POLYGON((' + polygon.map(point => point.join(' ')).join(',') + '))';
        const query = {
            text: 'SELECT public.getokreses(ST_GeomFromText($1)) AS districts',
            values: [wktPolygon],
        };
  
        const { rows } = await pool.query(query);
        if(rows[0].districts) {
            res.status(200).json(rows[0].districts.map(item => item.Okres));
        } else {
            res.status(200).send("None");
        }
    } catch (error) {
        console.error('Error querying the database:', error.stack);
        res.status(500).send('Internal Server Error');
    }
};
