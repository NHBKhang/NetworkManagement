import { Component, OnInit, afterNextRender } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkService, NetworkSpeedData } from '../../services/network/network.service';
import { DevicesService, NetworkInterface } from '../../services/devices/devices.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  networkData: NetworkSpeedData | null = null;
  networkInterfaces: NetworkInterface[] | null = null;
  loading: boolean = true;

  constructor(
    private titleService: Title,
    private networkService: NetworkService,
    private devicesService: DevicesService
  ) {
    afterNextRender(() => this.fetchNetworkSpeed())
  }

  ngOnInit(): void {
    this.titleService.setTitle('Trang chủ - Quản Lý Thiết Bị Mạng');
    this.devicesService.getCurrnetDeviceNetwork().subscribe(
      (data) => {
        this.networkInterfaces = data;
      },
      (error) => {
        console.error('Error fetching network speed:', error);
        this.networkInterfaces = [];
      }
    );
  }

  fetchNetworkSpeed(): void {
    this.networkService.getNetworkSpeed().subscribe(
      (data) => {
        this.networkData = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching network speed:', error);
        this.networkData = { downloadSpeed: 0, uploadSpeed: 0, ping: 0 };
        this.loading = false;
      }
    );
  }
}
