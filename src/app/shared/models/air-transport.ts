export class AirTransport {
    public trip_id?: number;
    public flight_datetime?: string;
    public flight_number?: string;
    public dest_from?: string;
    public dest_to?: string;
    public depart_time?:string;
    public arrive_time?: string;
    public first_option?: string;
    public first_opt_fee?: number;
    public second_option?: string;
    public second_opt_fee ?: number;
    public third_option?: string;
    public third_opt_fee?: number;
    public currency_id?: number;
    public remarks?: string;
}
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class ResponseDetailAir extends ResponseApI{
    public data?: AirTransport[];
}