import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../network.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  downloadSpeed: string = '';
  uploadSpeed: string = '';
  uptime: string = '';
  connectionStatus: string = '';

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Trang chủ - Quản Lý Thiết Bị Mạng');
  }

}
