const si = require('systeminformation');

const getCurrentDevice = async (req, res) => {
    try {
        const networks = await si.networkInterfaces();
        res.json(networks); // Trả về thông tin thiết bị
    } catch (error) {
        res.status(500).json({ error: 'Không thể lấy thông tin thiết bị' });
    }
};

module.exports = {
    getCurrentDevice,
};
