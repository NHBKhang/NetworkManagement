const express = require('express');
const { getCurrentDevice } = require('../controllers/deviceController');
const router = express.Router();
const Device = require('../models/Device');

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the device
 *         name:
 *           type: string
 *           description: The name of the device
 *         type:
 *           type: string
 *           description: The type of the device
 *       example:
 *         id: 123
 *         name: Router
 *         type: Networking
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Get all devices
 *     responses:
 *       200:
 *         description: A list of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */

router.get('/', async (req, res) => {
    // try {
    //     const devices = await Device.find();
    //     res.status(200).json(devices);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error' });
    // }
});

router.get('/current-device', getCurrentDevice);

module.exports = router;
