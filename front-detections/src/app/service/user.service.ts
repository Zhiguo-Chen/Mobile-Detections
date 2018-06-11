import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService extends BaseService{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getServiceUrl(): string {
    return '';
  }

  public get(id): Observable<any> {
    return Observable.of({});
  }

}
