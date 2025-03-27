const si = require('systeminformation');
const Device = require('../models/Device');
const ping = require('ping');

const getCurrentDevice = async (req, res) => {
    try {
        const networks = await si.networkInterfaces();
        res.json(networks); // Trả về thông tin thiết bị
    } catch (error) {
        res.status(500).json({ error: 'Không thể lấy thông tin thiết bị' });
    }
};

const addDevice = async (req, res) => {
    const { name, ip, mac, type } = req.body;
 
    if (!name || !ip || !mac || !type) {
        return res.status(400).json({ error: 'Thiếu thông tin thiết bị' });
    }

    try {
        const newDevice = new Device({
            name,
            ip,
            mac,
            type,
            status: 'unknown',
        });

        await newDevice.save();
        res.status(201).json({ message: 'Thiết bị đã được thêm', device: newDevice });
    } catch (error) {
        res.status(500).json({ error: 'Không thể thêm thiết bị' });
    }
};

const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ error: 'Không thể lấy danh sách thiết bị' });
    }
};

const checkDeviceStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findById(id);

        if (!device) return res.status(404).json({ error: 'Thiết bị không tồn tại' });

        // Kiểm tra trạng thái qua ping
        const pingResult = await ping.promise.probe(device.ip);
        device.status = pingResult.alive ? 'online' : 'offline';
        device.lastUpdated = new Date();
        await device.save();

        res.status(200).json(device);
    } catch (error) {
        res.status(500).json({ error: 'Không thể kiểm tra trạng thái thiết bị' });
    }
};

module.exports = {
    getCurrentDevice,
    addDevice,
    getDevices,
    checkDeviceStatus
};
