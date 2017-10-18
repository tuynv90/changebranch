export class Tenant {
    public tenant_id?: number;
    public tenant_name?: string;
    public description?: string;
    public manager_id?: number;
    public mananger_name?: string;
}
// export class Manager {
//     public manager_id: number;
//     public manager_name: string;
// }
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class Response extends ResponseApI{
    // public success: number;
    // public message?: string;
    public data?: Tenant [];
    public rows?: number;
}
export class ResponseDetailTenant extends ResponseApI{
    // public success: number;
    // public message?: string;
    public data?: Tenant;
}
export interface ResponseCandidateTenant extends ResponseApI{
    data: Tenant[];
}