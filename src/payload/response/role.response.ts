import { RoleDocument } from "src/schema/role.schema";

export class GetListRoleResponse {
  data: RoleDocument[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
