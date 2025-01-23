import { Component, OnInit, afterNextRender } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkSpeedData, SpeedTestService } from '../services/speed-test.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  networkData: NetworkSpeedData | null = null;
  loading: boolean = true;

  constructor(
    private titleService: Title,
    private speedTestService: SpeedTestService
  ) { 
    afterNextRender(() => this.fetchNetworkSpeed())
  }

  ngOnInit(): void {
    this.titleService.setTitle('Trang chủ - Quản Lý Thiết Bị Mạng');
  }

  fetchNetworkSpeed(): void {
    this.speedTestService.getNetworkSpeed().subscribe(
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
