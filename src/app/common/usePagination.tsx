import { useCallback } from 'react';

export function usePagination<T>(max: number) {
  return useCallback((data: T[], ) => {
    if (data) {
      const newPages: { [page: number]: T[] } = {};
      const count = data.length;
      if (count <= max) newPages[1] = [...data];
      else {
        let j = 1;
        for (let i = 0; i < count; i++) {
          const newPageContent = newPages[j] != null ? [...newPages[j], data[i]] : [data[i]];
          newPages[j] = newPageContent;
          j = i && (i + 1) % max === 0 ? j + 1 : j;
        }
      }
      return newPages;
    }
    return {1 : []};
  }, [max]);
}