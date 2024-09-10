export interface ResponseSuccess {
  status: number;
  message: string;
}

export interface ResponseFailure {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
}
