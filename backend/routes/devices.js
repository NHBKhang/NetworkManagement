const express = require('express');
const { getCurrentDevice, addDevice, getDevices, checkDeviceStatus } = require('../controllers/deviceController');
const router = express.Router();

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

router.post('', addDevice);

router.get('', getDevices);

router.get('/:id/status', checkDeviceStatus);

router.get('/current-device', getCurrentDevice);

module.exports = router;
