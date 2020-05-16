export const notEmpty = (parameter: string | number | undefined | null): parameter is string | number =>
  parameter != null && parameter !== '';

export const empty = (parameter: string | number | undefined | null): parameter is undefined | null =>
  parameter == null || parameter === '';

export const isEmptyObject = (obj: any) => {
  for (const i in obj) {
    return false;
  }
  return true;
};
