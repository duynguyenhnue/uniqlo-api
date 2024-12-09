import { HttpStatus } from "@nestjs/common";
import { IResponse } from "../interface/response.interface";

export const successResponse = <T>(data?: T): IResponse<T> => {
  return {
    statusCode: HttpStatus.OK,
    message: "sussess",
    data,
  };
};
