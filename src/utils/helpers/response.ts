export type ResponseSuccess = {
  status: number;
  message: string;
  data?: any;
  pagination?: {
    currentPage: number;
    totalPage: number;
    data: number;
    totalData: number;
  };
  limitation?: {
    limit: number;
    totalData: number;
  }
};

export type ResponseError = {
  status: number;
  message: string;
};
