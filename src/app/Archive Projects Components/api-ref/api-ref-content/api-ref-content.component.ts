import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api-ref-content',
  templateUrl: './api-ref-content.component.html',
  styleUrls: ['./api-ref-content.component.css']
})
export class ApiRefContentComponent implements OnInit {
  apiData: any = []

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.getAPIData()
  }

  async getAPIData() {
    let apiRes = await this.apiService.getAPIData()
    this.apiData = apiRes
  }

}
