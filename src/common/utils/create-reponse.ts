type ErrorType = {
  message: string;
  type: InstanceType<typeof Error>;
  reason: string;
};

export const Response = (
  message: string,
  status: number,
  data?: object,
  error?: ErrorType | undefined,
) => {
  return {
    data: data ?? null,
    message,
    status,
    success: error ?? true,
    error: error ?? null,
  };
};
