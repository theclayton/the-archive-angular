import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-api-ref-content',
  templateUrl: './api-ref-content.component.html',
  styleUrls: ['./api-ref-content.component.css']
})
export class ApiRefContentComponent implements OnInit {
  apiData: any = []
  baseURL: string = environment.apiUrl + "api"
  
  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.getAPIData()
  }

  async getAPIData() {
    let apiRes = await this.apiService.getAPIData()
    this.apiData = apiRes
  }

  getMethodColor(endpoint) {
    let color = 'yellow'

    if (endpoint.method === 'GET') {
      color = '#85a392'
    } else if (endpoint.method === 'POST') {
      color = '#f5b971'
    } else if (endpoint.method === 'PUT') {
      color = '#87a8d0'
    } else if (endpoint.method === 'DELETE') {
      color = '#d8345f'
    }
    return color
  }

}
