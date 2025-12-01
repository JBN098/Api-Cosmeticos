import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseCosmeticosByPage, ApiResponseCRUDCosmetico, Cosmetico} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase= 'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/'


getCosmeticosByPage(page: number): Observable<ApiResponseCosmeticosByPage>{
  return this.http.get<ApiResponseCosmeticosByPage>(this.urlBase +'paged?page='+ page);
}


getOneCosmetico(id: string): Observable<Cosmetico>{
    return this.http.get<Cosmetico>(this.urlBase +'detail/'+id);
}
getCosmeticoByName(cosmetico: Cosmetico): Observable<any>{
    return this.http.get<any>(this.urlBase +'cosmeticoByName/'+cosmetico.name);
}

postCosmetico(cosmetico: Cosmetico): Observable<ApiResponseCRUDCosmetico>{
    return this.http.post<any>(this.urlBase + 'addOne', cosmetico);

}

patchCosmetico(cosmetico: Cosmetico): Observable<ApiResponseCRUDCosmetico>{
    return this.http.patch<any>(this.urlBase + 'updateOne/'+cosmetico._id, cosmetico);
}

deleteCosmetico(id: string): Observable<ApiResponseCRUDCosmetico>{
    return this.http.delete<ApiResponseCRUDCosmetico>(this.urlBase + 'deleteOne/' + id);
}

}
