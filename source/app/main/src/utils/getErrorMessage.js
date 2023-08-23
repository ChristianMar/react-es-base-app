export const getErrorMessage = (isError, error) =>
  !isError ? { message: undefined } : { message: error?.data?.message };
