export class Department {
    public dept_id?: number;
    public dept_name?: string;
    public tenant_id?: number;
    public tenant_name?: string;
    public manager_id?: number;
    public manager_name?: string;
}
// export class Manager {
//     public manager_id: number;
//     public manager_name: string;
// }
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class ResponseList extends ResponseApI{
    public success: number;
    public message?: string;
    public data?: Department [];
    public rows?: number;
}
export class ResponseDetailDepartment extends ResponseApI{
    // public success: number;
    // public message?: string;
    public data?: Department;
}