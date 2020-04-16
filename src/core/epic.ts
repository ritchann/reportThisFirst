import { of, concat, Observable } from 'rxjs';
import { filter, switchMap, catchError, tap, takeUntil, map, groupBy, mergeMap } from 'rxjs/operators';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { ActionType } from 'data/actionTypes';

import { AppAction } from './baseTypes';
import { error, wait, ok } from './loader';
import { StoreType } from './store';
import { AppActionCreator } from './redux';

export const createEpic = <T>(
  creator: AppActionCreator<T>,
  handler: (data: T, mod: string | undefined, state$: StateObservable<StoreType>) => Observable<AppAction<any>>
) => (action$: ActionsObservable<AppAction<any>>, state$: StateObservable<StoreType>) =>
  action$.pipe(
    filter(x => x.type === creator.actionType),
    groupBy(x => x.mod),
    mergeMap(x =>
      x.pipe(
        switchMap(x =>
          concat(
            of(wait(creator.actionType, x.mod)),
            handler(x.data, x.mod, state$).pipe(
              tap(
                () => {},
                error => x.callBack?.(error),
                () => x.callBack?.()
              )
            ),
            of(ok(creator.actionType, x.mod))
          ).pipe(catchError(e => of(error(creator.actionType, x.mod))))
        )
      )
    )
  );
