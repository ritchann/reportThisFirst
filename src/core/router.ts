import { __RouterContext, RouteComponentProps } from 'react-router';
import { useContext } from 'react';

export const useLocation = <P = {}>() => {
  const context = useContext(__RouterContext) as RouteComponentProps<P>;
  return context.location;
};
