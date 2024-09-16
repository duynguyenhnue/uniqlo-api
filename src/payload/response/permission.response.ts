import { PermissionDocument } from "src/schema/permission.schema";

export class GetListPermissionResponse {
  data: PermissionDocument[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
