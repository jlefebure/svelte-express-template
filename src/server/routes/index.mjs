import express from 'express';

const router = express.Router();

/**
 * Put some call there
 */
router.get('/hello', async function (req, res) {
    res.send({status: "Hello world"});
});

export default router;