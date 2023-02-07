import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitor } from '../models/solicitor.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitorLookupService {
  constructor(private httpClient: HttpClient) {}

  lookupSolicitor(searchString: string): Observable<Solicitor[]> {
    return this.httpClient.get<Solicitor[]>(
      ApiService.compileUrl('/solicitors/lookup'),
      {
        params: {
          searchString,
        },
      },
    );
  }
}
