import { UserPermission } from '../../util/enums/user-permission';

export interface User {
    id: number;
    username: string;
    permissions: UserPermission[];
    createdAt: string;
    updatedAt: string;
}
