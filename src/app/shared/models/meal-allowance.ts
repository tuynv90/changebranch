export class MealAllowance {
    public no? : number;
    public trip_id?: number;
    public level? : string;
    public breakfast_allowance?: number;
    public launch_allowance?: number;
    public dinner_allowance?: number;
    public total? : number;
    public travel_from?: string;
    public travel_to? : string;
    public total_days? : number;
    public grand_total?: number;
    public deduction? : number;
    public currency_id?: number;
}
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class ResponseDetailMeal extends ResponseApI{
    public data?: MealAllowance[];
}