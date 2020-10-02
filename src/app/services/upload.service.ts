import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

const BACKEND_URL = environment.apiUrl + "api/upload"

@Injectable({ providedIn: "root" })

export class UploadService {

  constructor(private httpClient: HttpClient) { }

  async uploadFile(file) {

    try {
      let res = await this.httpClient.post<{ message: string, filename: string }>(BACKEND_URL, file).toPromise()

      if (res.message === "success") {
        return { message: res.message, filename: res.filename }
      }
    } catch (ex) {
      return { message: "Unable to upload file" }
    }
  }

}