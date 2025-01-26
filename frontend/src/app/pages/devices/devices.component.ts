import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent implements OnInit {
  devices = [
    { id: 1, name: 'Router Wi-Fi', type: 'Router', status: 'active' },
    { id: 2, name: 'Switch Ethernet', type: 'Switch', status: 'inactive' },
    { id: 3, name: 'Access Point', type: 'Access Point', status: 'active' }
  ];

  newDevice = {
    name: '',
    type: '',
    status: 'active'
  };

  constructor() { }

  ngOnInit(): void {
  }

  addDevice() {
    const newDevice = { ...this.newDevice, id: this.devices.length + 1 };
    this.devices.push(newDevice);
    this.newDevice = { name: '', type: '', status: 'active' }; // reset form
  }

  editDevice(device : any) {
    // Logic chỉnh sửa thiết bị
    console.log('Chỉnh sửa thiết bị: ', device);
  }

  deleteDevice(deviceId : any) {
    this.devices = this.devices.filter(device => device.id !== deviceId);
  }
}
