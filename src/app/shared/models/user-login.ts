export class User {
    public employee_id: number;
    public employee_name: string;
    public email?: string;
    public phone_number?: string;
    public avatar?: string;
    public employee_no?: string;
    public roles?: Role[];
}
export class Role {
    public id: number;
}
export class UserRole {
    public id: number;
    public RoleId: number;
    public UserId: number;
};
export class DataResponse {
    public success: number;
    public access_token?: string;
    public message?: string;
    public user: User; 
}