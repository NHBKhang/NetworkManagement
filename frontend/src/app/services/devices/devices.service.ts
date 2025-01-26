import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private baseUrl = `${env.API_URL}/devices`;

  constructor(private http: HttpClient) { }

  // Fetch current device network data
  getCurrnetDeviceNetwork(): Observable<NetworkInterface[]> {
    return this.http.get<NetworkInterface[]>(`${this.baseUrl}/current-device`).pipe(
      catchError(this.handleError<NetworkInterface[]>('getCurrnetDeviceNetwork', []))
    );
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

// Define the structure of the network interface data
export interface NetworkInterface {
  iface: string; // Tên giao diện mạng (ví dụ: "Wi-Fi")
  ifaceName: string; // Tên đầy đủ của giao diện mạng
  default: boolean; // Có phải là giao diện mặc định không
  ip4?: string; // Địa chỉ IPv4 (có thể không có)
  ip4subnet?: string; // Subnet mask IPv4 (có thể không có)
  ip6?: string; // Địa chỉ IPv6 (có thể không có)
  ip6subnet?: string; // Subnet mask IPv6 (có thể không có)
  mac: string; // Địa chỉ MAC
  internal: boolean; // Có phải giao diện nội bộ (loopback) không
  virtual: boolean; // Có phải giao diện ảo không
  operstate: string; // Trạng thái hoạt động (ví dụ: "up", "down")
  type: string; // Loại giao diện (ví dụ: "wireless", "wired")
  duplex?: string; // Chế độ song công (có thể không có)
  mtu?: string; // Kích thước đơn vị truyền tối đa (có thể không có)
  speed?: number; // Tốc độ mạng (Mbps, có thể không có)
  dhcp: boolean; // Có sử dụng DHCP không
  dnsSuffix?: string; // Hậu tố DNS (có thể không có)
  ieee8021xAuth?: string; // Trạng thái xác thực IEEE 802.1x
  ieee8021xState?: string; // Trạng thái IEEE 802.1x
  carrierChanges?: number; // Số lần thay đổi kết nối mạng
}
