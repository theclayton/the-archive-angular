import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: "root" })

export class APIService {

  constructor(private httpClient: HttpClient) { }

    async getAPIData() {
        const data = await this.httpClient.get("./assets/api.json").toPromise()
        return data
    }

}