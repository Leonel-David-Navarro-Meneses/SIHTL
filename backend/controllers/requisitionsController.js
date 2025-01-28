const pool = require('../config/db');

const getRequisitions = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM requisitions');
        res.json(rows);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};




const createRequisition = async (req, res) =>{
    const { requisition_number, administrative_unit, concept, sub_concept, justification, type } = req.body;
    try{

        const [result] = await pool.query(
            'INSERT INTO requisitions (requisition_number, administrative_unit, concept, sub_concept, justification, type) VALUES (?, ?, ?, ?, ?, ?)',
            [requisition_number, administrative_unit, concept, sub_concept, justification, type]
        );
        res.json({ id: result.insertId, message: 'Requisición creada exitosamente'});
    }catch (error){
        res.status(500).json({ error: error.message });
    }
};


module.exports = {getRequisitions, createRequisition};