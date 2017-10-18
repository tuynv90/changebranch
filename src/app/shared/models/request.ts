export class RequestInfor {
    public trip_id?: number;
    public employee_id?: number;
    public accompanied_by?: string;
    public purpose?: string;
    public travel_dest?: string;
    public depart_datetime?: string;
    public return_datetime?: string;
    public status?: number;
    public land_transport_expense?: number;
    public air_transport_expense?: number;
    public own_accomm_expense?: number;
    public hotel_accomm_expense?: number;
    public meal_allowance?: number;
    public visa_fee?: number;
    public laundry?: number;
    public other_expenses?: number;
    public total_expense?: number;
    public type_of_travel?: number;
    public created_datetime?: string;
    public updated_datetime?: string;
    public benificiary?: string;
    public benificiary_bank_acc?: string;
    public benificiary_bank_branch?: string;
    public createdAt?: string;
    public updatedAt?: string;
    public allowance_name? :string;
    public total_days? : number;
    public expense? : number;

}

export class ResponseApI {
    public success?: number;
    public message?: string;
    public data ? : RequestInfor;
}
export class ResponseList extends ResponseApI {
    public success: number;
    public message?: string;
    public datas?: RequestInfor[];
    public rows?: number;
}
export class ResponseDetailRequest extends ResponseApI {
    // public success: number;
    // public message?: string;
    public data?: RequestInfor;
}
export interface ResponseCandidateRquest extends ResponseApI{
    datas: RequestInfor[];
}