export class HotelAccommodation {
    public trip_id?: number;
    public hotel?: string;
    public checkin_date?: string;
    public checkout_date?: string;
    public total_night?: number;
    public corp_rate_USD? : number;
    public corp_rate?: number;
    public vat_USD?: number;
    public vat?: number;
    public total_USD? : number;
    public total?: number;
    public currency_id?: number;
    public remarks?: string;
}
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class ResponseDetailHotel extends ResponseApI{
    public data?: HotelAccommodation[];
}