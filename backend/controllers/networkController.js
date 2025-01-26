const wifi = require('wifi-control');

var settings = {
    debug: true || false,
    iface: 'wlan0',
    connectionTimeout: 10000 // in ms
};

wifi.configure(settings);

const scanNetworks = (req, res) => {
    wifi.scanForWiFi((error, networks) => {
        if (error) {
            return res.status(500).json({ error: 'Lỗi khi quét mạng' });
        }
        res.json(networks); // Trả về danh sách các mạng Wi-Fi xung quanh
    });
};

const connectToWifi = (ssid, password) => {
    wifi.connectToWifi({ ssid: ssid, password: password }, (error) => {
        if (error) {
            console.log('Không thể kết nối vào Wi-Fi:', error);
        } else {
            console.log('Đã kết nối vào Wi-Fi:', ssid);
        }
    });
};

module.exports = {
    scanNetworks,
    connectToWifi
};
