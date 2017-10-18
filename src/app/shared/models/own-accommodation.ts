export class OwnAccommodation {
    public trip_id?: number;
    public checkin_date?: string;
    public checkout_date?: string;
    public total_days?: number;
    public accomm_allowance?: number;
    public calculation?: number;
    public grand_total?: number;
    public currency_id?: number;
    public remarks?: string;
}
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class ResponseDetailOwn extends ResponseApI{
    public data?: OwnAccommodation[];
}