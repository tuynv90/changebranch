export class LandTransport {
    public vehicle_id?: number;
    public vehicle_name?: string;
    public expenses?: string;
    public totalkm?: number;
    public rate_per_km?: number;
    public calculation?:number;
    public grand_total_USD?: number;
    public grand_total?: number;
    public remark?: string;
    public trip_id?: number;
    public currency_id ?: number;
}
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class ResponseDetailLand extends ResponseApI{
    public data?: LandTransport[];
}