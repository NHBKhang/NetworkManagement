import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NetworkSpeedData, SpeedTestService } from '../services/speed-test.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  networkData: NetworkSpeedData | null = null;

  constructor(
    private titleService: Title,
    private speedTestService: SpeedTestService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Trang chủ - Quản Lý Thiết Bị Mạng');
    this.fetchNetworkSpeed();
  }

  fetchNetworkSpeed(): void {
    this.speedTestService.getNetworkSpeed().subscribe(
      (data) => {
        this.networkData = data;
      },
      (error) => {
        console.error('Error fetching network speed:', error);
      }
    );
  }
}
