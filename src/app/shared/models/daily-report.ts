export class DailyReport {
    public no? : number;
    public trip_id?: number;
    public from_date? : string;
    public to_date?: string;
    public from_time? : string;
    public to_time?: string;
    public duration? : number;
    public from_datetime? : string;
    public to_datetime?: string;
    public vanue? : string;
    public agenda? : string;
    public person_met?: string;
    public outcome? : string;
}
export class ResponseApI {
    public success: number;
    public message?: string;
}
export class ResponseDetailDailyReport extends ResponseApI{
    public data?: DailyReport[];
}