export class Employee {
    public employee_id?: number;
    public employee_name?: string;
    public email?: string;
    public phone_number?: string;
    public jobgrade_id?: number;
    public dept_id?: number;
    public employee_no?: string;
    public deleted_flag?: boolean;
}
export class Manager {
     employee_id?: number;
     employee_name?: string;
}
export interface ResponseApI {
     success: number;
     message?: string;
}
export interface ResponseCandidateManager extends ResponseApI{
    data: Manager[];
}
// export class ResponseDetailEmployee extends ResponseApI{
//     // public success: number;
//     // public message?: string;
//     public data?: Tenant;
// }