import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { stringify } from 'query-string';

class HttpWrapper {
  private _getUrl(url: string, params?: { [key: string]: any }) {
    return params != null ? `${url}?${stringify(params)}` : `${url}`;
  }

  public get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    return ajax.get(this._getUrl(url, params)).pipe(
      map(x => x.response),
      catchError(e => {
        throw e;
      })
    );
  }

  public patch<T>(url: string, data: {}, params?: { [key: string]: any }, header?: {}): Observable<T> {
    return ajax.patch(this._getUrl(url, params), data, header).pipe(
      map(x => x.response),
      catchError(e => {
        throw e;
      })
    );
  }
}

export const http = new HttpWrapper();
