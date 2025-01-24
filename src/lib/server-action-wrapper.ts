type SuccessfulResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ServerAction<T> = () => Promise<SuccessfulResponse<T> | ErrorResponse>;
type InputAction<T> = () => Promise<T>;
export const serverActionWrapper = <T>(
  action: InputAction<T>,
): ServerAction<T> => {
  return async () => {
    try {
      const result = await action();
      return {
        data: result,
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e instanceof Error
            ? e.message
            : typeof e === 'string'
            ? e
            : 'An unexpected error occurred',
      };
    }
  };
};
