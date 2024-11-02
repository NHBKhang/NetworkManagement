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
app.get('/api/devices', async (req, res) => {
    // Logic để lấy danh sách thiết bị
});
