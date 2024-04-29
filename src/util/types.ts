export type ServerResponse<T = any> = {
  data?: T;
  status?: "success" | "error";
  errorMessage?: string;
  errorMessageUser?: string;
};