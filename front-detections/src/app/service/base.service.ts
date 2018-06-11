import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

export abstract class BaseService {

  constructor(protected http: HttpClient) {
  }
  public abstract getServiceUrl(): string;
  get(id: number) {
    return this.http.get(this.getServiceUrl() + "/" + id, this.getJsonHeader())
      .catch(this.handleError);
  }
  protected getJsonHeader() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json')
      .set('jwt', localStorage.getItem('token'));
    return {headers: headers};
  }
  protected handleError(error) {
    let errorMessage = error.json().message;
    if (error.json().error) {
      errorMessage += ":" + error.json().error;
    }
    switch (error.status) {
      case 401:
        return Observable.throw("invalid token");
      default:
        return Observable.throw(errorMessage);
    }
  }
}
