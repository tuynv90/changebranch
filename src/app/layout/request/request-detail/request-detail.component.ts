import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestInfor } from '../../../shared/models/request';
import { LandTransport } from '../../../shared/models/land-transport';
import { RequestService } from '../../../shared/services/request.service';
import { AppSettings } from '../../../app.setting';
import { BudgetType } from '../../../shared/enums/budget-type.enum';
import { LandTransportService } from '../../../shared/services/land-transport.service';
import * as moment from 'moment';
import { AirTransport } from '../../../shared/models/air-transport';
import { OwnAccommodation } from '../../../shared/models/own-accommodation';
import { HotelAccommodation } from '../../../shared/models/hotem-accommodation';
import { MealAllowance } from '../../../shared/models/meal-allowance';
import { DailyReport } from '../../../shared/models/daily-report';

declare var $: any;

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {
  showInfo: any;
  listDeleteBeforDaily = [];
  totalBudget: number;
  totalMeal: number;
  listDeleteHotel = [];
  totalOwn: number;
  listDeleteAir = [];
  listDelete = [];
  listDeleteOwn = [];
  threeFee: number;
  secondFee: number;
  firtFee: number;
  requestInfor: RequestInfor;
  trip_id: number;
  isEdit: boolean;
  alert: any = '';
  userLogin: Object;
  landTransport: LandTransport[];
  originLandData: LandTransport[];
  baseLandData: LandTransport[];
  totalUSD: number;
  totalVND: number;
  summary: {}[];
  budgetType = BudgetType;
  airTransport: AirTransport[] = [];
  originAirTransport: AirTransport[];
  baseAirTransport: AirTransport[] = [];
  ownAccom: OwnAccommodation[] = [];
  originOwnAccom: OwnAccommodation[];
  baseOwnAccom: OwnAccommodation[] = [];
  hotelAccom: HotelAccommodation[] = [];
  originHotel: HotelAccommodation[];
  baseHotel: HotelAccommodation[] = [];
  totalHotel: number;
  mealAllowance: MealAllowance[];
  originMealAllowance: MealAllowance[];
  baseMealAllowance: MealAllowance[];
  sumaryRequest: RequestInfor[];
  dailyReport: DailyReport[] = [];
  originReport: DailyReport[] = [];
  baseReport: DailyReport[] = [];
  constructor(private route: ActivatedRoute, private location: Location, private requestService: RequestService, private landTransportService: LandTransportService) {
    let userLocalStorage = localStorage.getItem(AppSettings.USER);
    if (userLocalStorage)
      this.userLogin = JSON.parse(userLocalStorage);
    this.baseLandData = [
      { vehicle_id: 1, vehicle_name: 'Co Vehicle (with Driver)', expenses: 'Petrol', totalkm: null, rate_per_km: null, grand_total_USD: null, grand_total: null, remark: '', trip_id: null, currency_id: 1 },
      { vehicle_id: 2, vehicle_name: 'Co Vehicle (Self-drive)', expenses: 'Petrol', totalkm: null, rate_per_km: null, grand_total_USD: null, grand_total: null, remark: '', trip_id: null, currency_id: 1 },
      { vehicle_id: 3, vehicle_name: 'Own Vehicle', expenses: 'Mileage', totalkm: null, rate_per_km: 8500, grand_total_USD: null, grand_total: null, remark: '', trip_id: null, currency_id: 2 },
      { vehicle_id: 4, vehicle_name: 'Own Motorcycle', expenses: 'Mileage', totalkm: null, rate_per_km: 3200, grand_total_USD: null, grand_total: null, remark: '', trip_id: null, currency_id: 2 },
      { vehicle_id: 5, vehicle_name: 'Taxi Fare', expenses: 'Fare', totalkm: null, rate_per_km: null, grand_total_USD: null, grand_total: null, remark: '', trip_id: null, currency_id: 1 },
      { vehicle_id: 6, vehicle_name: 'Train', expenses: 'Fare', totalkm: null, rate_per_km: null, grand_total_USD: null, grand_total: null, remark: '', trip_id: null, currency_id: 1 },
      { vehicle_id: 7, vehicle_name: 'Others - ', expenses: 'Fare', totalkm: null, rate_per_km: null, grand_total_USD: null, grand_total: null, remark: '', trip_id: null, currency_id: 1 }
    ];
    this.baseMealAllowance = [
      { no: 1, level: ' 1   AM - SRM', breakfast_allowance: 0, launch_allowance: 0, dinner_allowance: 0, total: null, travel_from: '', travel_to: '', total_days: null, deduction: 0, grand_total: null, currency_id: 2, trip_id: this.trip_id },
      { no: 2, level: ' 2   OFFICER', breakfast_allowance: 0, launch_allowance: 0, dinner_allowance: 0, total: null, travel_from: '', travel_to: '', total_days: null, deduction: 0, grand_total: null, currency_id: 2, trip_id: this.trip_id },
      { no: 3, level: ' 3   GEN. W', breakfast_allowance: 0, launch_allowance: 0, dinner_allowance: 0, total: null, travel_from: '', travel_to: '', total_days: null, deduction: 0, grand_total: null, currency_id: 2, trip_id: this.trip_id }
    ];
    this.mealAllowance = JSON.parse(JSON.stringify(this.baseMealAllowance));
    this.landTransport = JSON.parse(JSON.stringify(this.baseLandData));
  }
  getData() {
    this.requestService.getMealAccombyId(this.trip_id).subscribe(result => {
      this.originMealAllowance = result.data;
      // this.originMealAllowance.forEach(x=>{
      //   this.baseMealAllowance['']
      // })
    })
    this.mealAllowance = JSON.parse(JSON.stringify(this.baseMealAllowance));

    this.landTransportService.getLandbyId(this.trip_id).subscribe(result => {
      this.originLandData = result.data;
      console.log(this.originLandData);
      this.originLandData.forEach(x => {
        this.baseLandData[`${x.vehicle_id - 1}`].totalkm = x.totalkm;
        this.baseLandData[`${x.vehicle_id - 1}`].grand_total = x.grand_total;
        this.baseLandData[`${x.vehicle_id - 1}`].remark = x.remark;
        this.baseLandData[`${x.vehicle_id - 1}`].trip_id = x.trip_id;
        if (x.vehicle_id != 3 && x.vehicle_id != 4)
          this.baseLandData[`${x.vehicle_id - 1}`].rate_per_km = x.rate_per_km;

      })
      this.landTransport = JSON.parse(JSON.stringify(this.baseLandData));
    });


    this.requestService.getAirTransportbyId(this.trip_id).subscribe(result => {
      this.originAirTransport = result.data;
      this.originAirTransport.forEach(x => {

        let data: AirTransport = {
          flight_datetime: x.flight_datetime ? moment.utc(x.flight_datetime).format('YYYY-MM-DD') : null,
          flight_number: x.flight_number,
          dest_from: x.dest_from,
          dest_to: x.dest_to,
          depart_time: x.depart_time ? moment.utc(x.depart_time).format('YYYY-MM-DD') : null,
          arrive_time: x.flight_datetime ? moment.utc(x.flight_datetime).format('YYYY-MM-DD') : null,
          first_option: 'VIETNAM AIR',
          first_opt_fee: x.first_opt_fee,
          second_option: 'VIETJET',
          second_opt_fee: x.second_opt_fee,
          third_option: 'Malindo',
          third_opt_fee: x.third_opt_fee,
          remarks: x.remarks,
          trip_id: x.trip_id,
          currency_id: x.currency_id
        }
        this.baseAirTransport.push(data);
      })
      this.airTransport = JSON.parse(JSON.stringify(this.baseAirTransport));
    });
    this.requestService.getOwnbyId(this.trip_id).subscribe((result) => {
      this.originOwnAccom = result.data;
      this.originOwnAccom.forEach(x => {
        let data: OwnAccommodation = {
          trip_id: x.trip_id,
          checkin_date: x.checkin_date ? moment.utc(x.checkin_date).format('YYYY-MM-DD') : null,
          checkout_date: x.checkout_date ? moment.utc(x.checkout_date).format('YYYY-MM-DD') : null,
          total_days: x.checkin_date && x.checkout_date ? (moment(x.checkout_date).unix() - moment(x.checkin_date).unix()) / (60 * 60 * 24) : null,
          accomm_allowance: x.accomm_allowance,
          calculation: x.grand_total ? x.grand_total : null,
          grand_total: x.grand_total,
          remarks: x.remarks,
          currency_id: x.currency_id
        };
        this.baseOwnAccom.push(data);
      })
      this.ownAccom = JSON.parse(JSON.stringify(this.baseOwnAccom));
    })
    this.requestService.getHotelAccom(this.trip_id).subscribe((result) => {
      this.originHotel = result.data;
      this.originHotel.forEach(x => {
        let data: HotelAccommodation = {
          trip_id: x.trip_id,
          hotel: x.hotel,
          checkin_date: x.checkin_date ? moment.utc(x.checkin_date).format('YYYY-MM-DD') : null,
          checkout_date: x.checkout_date ? moment.utc(x.checkout_date).format('YYYY-MM-DD') : null,
          total_night: x.checkin_date && x.checkout_date ? (moment(x.checkout_date).unix() - moment(x.checkin_date).unix()) / (60 * 60 * 24) : null,
          corp_rate: x.corp_rate || 0,
          corp_rate_USD: Number((x.corp_rate / 22500).toFixed(2)) || 0,
          vat: x.vat || 0,
          vat_USD: Number((x.vat / 22500).toFixed(2)) || 0,
          total: x.total || 0,
          total_USD: Number((x.total / 22500).toFixed(2)) || 0,
          remarks: x.remarks,
          currency_id: x.currency_id
        }
        this.baseHotel.push(data);
      })
      this.hotelAccom = JSON.parse(JSON.stringify(this.baseHotel));
    });
    this.requestService.getDailybyId(this.trip_id).subscribe(result => {
      this.originReport = result.data;
      this.originReport.forEach(x => {
        let data: DailyReport = {
          trip_id: x.trip_id,
          from_datetime: x.from_datetime,
          from_date: x.from_datetime ? moment.utc(x.from_datetime).format('YYYY-MM-DD') : null,
          from_time: x.from_datetime ? moment.utc(x.from_datetime).format('hh:mm A') : null,
          to_datetime: x.to_datetime,
          to_date: x.to_datetime ? moment.utc(x.to_datetime).format('YYYY-MM-DD') : null,
          to_time: x.to_datetime ? moment.utc(x.to_datetime).format('hh:mm A') : null,
          vanue: x.vanue,
          agenda: x.agenda,
          person_met: x.person_met,
          outcome: x.outcome
        }
        this.baseReport.push(data);
      });
      this.dailyReport = JSON.parse(JSON.stringify(this.baseReport));
    })
    this.requestService.getRequestbyId(this.trip_id).subscribe(result => {
      this.requestInfor = result.data;
      this.updateSummary(result.data);
     
      this.showInfo = {
        accompanied_by: this.requestInfor.accompanied_by,
        travel_dest: this.requestInfor.travel_dest,
        depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'),
        return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'),
        purpose: this.requestInfor.purpose,
      }
      this.calTotalBudget();
    })
  }
  updateSummary(data){
    this.sumaryRequest = [
      { allowance_name: 'Land Transport', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.land_transport_expense },
      { allowance_name: 'Air Transport', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.air_transport_expense },
      { allowance_name: 'Own Accommodation', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.own_accomm_expense },
      { allowance_name: 'Hotel Accommodation', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.hotel_accomm_expense },
      { allowance_name: 'Subsistence/Meals Allowance', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.meal_allowance },
      { allowance_name: 'Visa Fee(Overseas Travel only)', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.visa_fee },
      { allowance_name: 'Laundry', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.laundry },
      { allowance_name: 'Other Expenses- ', depart_datetime: moment(data.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(data.return_datetime).format('YYYY-MM-DD'), total_days: (moment(data.return_datetime).unix() - moment(data.depart_datetime).unix()) / (60 * 60 * 24), expense: data.other_expenses }
    ];
  }
  calTotalBudget() {
    this.totalBudget = this.sumaryRequest.reduce((sum, x) => {
      return sum + (x.expense || 0)
    }, 0)
  }
  submitted = false;

  onSubmit() { this.submitted = true; }

  ngOnInit() {
    // alert(this.tenant.tenant_name);
    this.alert = null;
    this.route.params.subscribe(params => {
      this.trip_id = +params['id']; // (+) converts string 'id' to a number
      if (this.trip_id) {
        //1. for Edit
        this.isEdit = true;
        this.showInfo = { employee_id: null }
        this.getData();
      } else {
        //2. for Addnew
        this.isEdit = false;
        this.showInfo = { employee_id: null }
      }

    });
  }
  // onChangeManager(selectedManager) {
  //   this.requestInfor.manager_id = selectedManager.employee_id;

  // }
  updateRequest() {
    this.requestService.updateRequest(this.requestInfor, this.trip_id).subscribe(result => {
      if (result.success === 1) {

      }
    })
  }
  addRequest() {
    let startDate = this.showInfo.depart_datetime ? moment.utc(this.showInfo.depart_datetime).format('YYYY-MM-DD') : null;
    let endDate = this.showInfo.return_datetime ? moment.utc(this.showInfo.return_datetime).format('YYYY-MM-DD') : null;
    let data: RequestInfor = {
      employee_id: this.userLogin['employee_id'],
      accompanied_by: this.showInfo.accompanied_by,
      travel_dest: this.showInfo.travel_dest,
      depart_datetime: startDate,
      return_datetime: endDate,
      purpose: this.showInfo.purpose,
      status: 0
    }
    this.requestService.addRequests(data).subscribe(result => {
      if (result.success === 1) {
        alert(result.message);
        this.requestInfor = result.data;
        localStorage.setItem(AppSettings.TRIP_ID, String(this.requestInfor.trip_id));
        this.sumaryRequest = [
          { allowance_name: 'Land Transport', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.land_transport_expense },
          { allowance_name: 'Air Transport', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.air_transport_expense },
          { allowance_name: 'Own Accommodation', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.own_accomm_expense },
          { allowance_name: 'Hotel Accommodation', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.hotel_accomm_expense },
          { allowance_name: 'Subsistence/Meals Allowance', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.meal_allowance },
          { allowance_name: 'Visa Fee(Overseas Travel only)', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.visa_fee },
          { allowance_name: 'Laundry', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.laundry },
          { allowance_name: 'Other Expenses- ', depart_datetime: moment(this.requestInfor.depart_datetime).format('YYYY-MM-DD'), return_datetime: moment(this.requestInfor.return_datetime).format('YYYY-MM-DD'), total_days: (moment(this.requestInfor.return_datetime).unix() - moment(this.requestInfor.depart_datetime).unix()) / (60 * 60 * 24), expense: this.requestInfor.other_expenses }
        ]
      } else {
        // TODO: 
      }
    })
  }
  goback() {
    this.location.back();
  }
  public closeAlert() {
    this.alert = null;
  }

  onChangeTotalKM(id) {
    console.log(this.landTransport)
    this.landTransport.map((x) => {
      if (x.vehicle_id == id && x.totalkm && x.rate_per_km) {
        x.trip_id = this.requestInfor.trip_id;
        if (x.currency_id == 1) {
          x.grand_total_USD = x.calculation = x.rate_per_km * x.totalkm;
          x.grand_total = x.calculation * 22500;
        } else {
          x.grand_total = x.calculation = x.rate_per_km * x.totalkm;
          x.grand_total_USD = Number((x.calculation / 22500).toFixed(2));
        }
      }
    });
    this.totalUSD = this.landTransport.reduce((sum, x) => {
      return x.grand_total_USD + sum;
    }, 0);
    this.totalVND = this.landTransport.reduce((sum, x) => {
      return x.grand_total + sum;
    }, 0)
    console.log(this.baseLandData);
  }
  checkRow(id, event, type) {
    switch (type) {
      case BudgetType.land:
        if (event.target.checked)
          this.listDelete.push(id);
        else
          this.listDelete = this.listDelete.filter((x) => x != id);
        break;
      case BudgetType.air:
        if (event.target.checked)
          this.listDeleteAir.push(id);
        else
          this.listDeleteAir = this.listDeleteAir.filter((x) => x != id);
        break;
      case BudgetType.ownAccommodation:
        if (event.target.checked)
          this.listDeleteOwn.push(id);
        else
          this.listDeleteOwn = this.listDeleteOwn.filter((x) => x != id);
        break;
      case BudgetType.hotel:
        if (event.target.checked)
          this.listDeleteHotel.push(id);
        else
          this.listDeleteHotel = this.listDeleteHotel.filter((x) => x != id);
        break;
      case BudgetType.beforeReport:
        if (event.target.checked)
          this.listDeleteBeforDaily.push(id);
        else
          this.listDeleteBeforDaily = this.listDeleteBeforDaily.filter((x) => x != id);
        break;
      default:
        break;
    }
  }
  changeCurrency(id) {
    this.landTransport.map((x) => {
      if (x.vehicle_id == id) {
        x.currency_id = x.currency_id == 1 ? 2 : 1;
      }
      return x;
    })
    this.onChangeTotalKM(id);
  }
  deleteRow(type) {
    switch (type) {
      case BudgetType.land:
        this.landTransport.map((x) => {
          if (this.listDelete.includes(x.vehicle_id)) {
            x.calculation = x.grand_total_USD = x.grand_total = x.totalkm = null;
            x.remark = '';
            if (x.vehicle_id != 3 && x.vehicle_id != 4)
              x.rate_per_km = null
          }
        })
        break;
      case BudgetType.air:
        this.listDeleteAir.forEach(x => {
          this.airTransport.splice(x, 1);
        })

        console.log(this.airTransport);
        break;
      case BudgetType.ownAccommodation:
        this.listDeleteOwn.forEach(x => {
          this.ownAccom.splice(x, 1);
        })
        break;
      case BudgetType.hotel:
        this.listDeleteHotel.forEach(x => {
          this.hotelAccom.splice(x, 1);
        })
        break;
      case BudgetType.meal:
        break;
      case BudgetType.beforeReport:
        this.listDeleteBeforDaily.forEach(x => {
          this.dailyReport.splice(x, 1);
        })
        break;
      default:
        break;
    }
  }
  reset(id) {
    switch (id) {
      case BudgetType.land:
        this.landTransport = this.baseLandData;
        break;
      case BudgetType.air:
        this.airTransport = this.baseAirTransport;
        break;
      case BudgetType.ownAccommodation:
        this.ownAccom = this.baseOwnAccom;
        break;
      case BudgetType.hotel:
        this.hotelAccom = this.baseHotel;
        break;
      case BudgetType.meal:
        break;
      case BudgetType.beforeReport:
        this.dailyReport = this.baseReport;
        break;
      default:
        break;
    }
  }
  addRow(type) {
    switch (type) {
      case BudgetType.land:
        // this.landTransport = this.baseLandData;
        break;
      case BudgetType.air:
        let data: AirTransport = {
          flight_datetime: '', flight_number: '', dest_from: '', dest_to: '', depart_time: '',
          arrive_time: '', first_option: 'VIETNAM AIR', first_opt_fee: null, second_option: 'VIETJET', second_opt_fee: null, third_option: 'Malindo', third_opt_fee: null, remarks: '', trip_id: this.trip_id, currency_id: 2
        }
        this.airTransport.push(data);
        break;
      case BudgetType.ownAccommodation:
        let own: OwnAccommodation = {
          checkin_date: '', checkout_date: '', total_days: null, accomm_allowance: null, calculation: null, grand_total: null, remarks: '', currency_id: 2, trip_id: this.trip_id
        }
        this.ownAccom.push(own);
        break;
      case BudgetType.hotel:
        let hotel: HotelAccommodation = {
          hotel: '', checkin_date: '', checkout_date: '', total_night: null, corp_rate_USD: null, corp_rate: null, vat_USD: 0, vat: 0, total_USD: null, total: null, remarks: '', currency_id: 2, trip_id: this.trip_id
        }
        this.hotelAccom.push(hotel)
        break;
      case BudgetType.meal:
        break;
      case BudgetType.beforeReport:
        let daily: DailyReport = {
          trip_id: this.trip_id, from_datetime: '', to_datetime: '', vanue: '', agenda: '', person_met: '', outcome: ''
        };
        this.dailyReport.push(daily);
        break;
      default:
        break;
    }

  }

  calSum() {
    this.firtFee = this.airTransport.reduce((sum, x) => {
      return sum + (x.first_opt_fee ? x.first_opt_fee : 0);
    }, 0);
    this.secondFee = this.airTransport.reduce((sum, x) => {
      return sum + x.second_opt_fee ? x.second_opt_fee : 0;
    }, 0);
    this.threeFee = this.airTransport.reduce((sum, x) => {
      return sum + x.third_opt_fee ? x.third_opt_fee : 0;
    }, 0);
  }
  calOwn(i) {
    if (this.ownAccom[i].total_days && this.ownAccom[i].accomm_allowance) {
      this.ownAccom[i].calculation = this.ownAccom[i].grand_total = this.ownAccom[i].total_days * this.ownAccom[i].accomm_allowance;
      this.totalOwn = this.ownAccom.reduce((sum, x) => {
        return sum + x.grand_total ? x.grand_total : 0;
      }, 0)
    }

  }
  calTotal(i) {
    if (this.hotelAccom[i].total_night && this.hotelAccom[i].corp_rate && this.hotelAccom[i].corp_rate_USD) {
      this.hotelAccom[i].total = this.hotelAccom[i].total_night * this.hotelAccom[i].corp_rate + this.hotelAccom[i].vat || 0;
      this.hotelAccom[i].total_USD = this.hotelAccom[i].total_night * this.hotelAccom[i].corp_rate_USD + this.hotelAccom[i].vat_USD || 0;
      this.totalHotel = this.hotelAccom.reduce((sum, x) => {
        return sum + x.total || 0
      }, 0)
    }
  }
  exchange(i, currency, field) {
    if (currency === 1) {
      if (field == 'corp_rate_USD' && this.hotelAccom[i].corp_rate_USD)
        this.hotelAccom[i].corp_rate = this.hotelAccom[i].corp_rate_USD * 22500;
      if (field == 'vat_USD' && this.hotelAccom[i].vat_USD)
        this.hotelAccom[i].vat = this.hotelAccom[i].vat_USD * 22500;
    } else {
      if (field == 'corp_rate' && this.hotelAccom[i].corp_rate)
        this.hotelAccom[i].corp_rate_USD = Number((this.hotelAccom[i].corp_rate / 22500).toFixed(2));
      if (field == 'vat' && this.hotelAccom[i].vat)
        this.hotelAccom[i].vat_USD = Number((this.hotelAccom[i].vat / 22500).toFixed(2));
    }
    this.calTotal(i);
  }
  changeDate(i, type) {
    switch (type) {
      case BudgetType.ownAccommodation:
        if (this.ownAccom[i].checkin_date && this.ownAccom[i].checkout_date) {
          this.ownAccom[i].total_days = (moment(this.ownAccom[i].checkout_date).unix() - moment(this.ownAccom[i].checkin_date).unix()) / (60 * 60 * 24);
        }
        this.calOwn(i);
        break;
      case BudgetType.hotel:
        if (this.hotelAccom[i].checkin_date && this.hotelAccom[i].checkout_date) {
          this.hotelAccom[i].total_night = (moment(this.hotelAccom[i].checkout_date).unix() - moment(this.hotelAccom[i].checkin_date).unix()) / (60 * 60 * 24);
        }
        this.calTotal(i);
        break;
      case BudgetType.beforeReport:
        // if (this.dailyReport[i].from_date && this.dailyReport[i].to_date) {
        //   this.hotelAccom[i].total_night = (moment(this.hotelAccom[i].checkout_date).unix() - moment(this.hotelAccom[i].checkin_date).unix()) / (60 * 60 * 24);
        // }
        break;
      default: break;
    }

  }
  calTotalMeal(id) {
    this.mealAllowance.map(x => {
      if (x.no === id) {
        x.total = (x.breakfast_allowance || 0) + (x.launch_allowance || 0) + (x.dinner_allowance || 0)
      }
      return x;
    })
    this.calMealAllowance(id)
  }
  calMealDay(id) {
    this.mealAllowance.map(x => {
      if (x.no === id) {
        x.total_days = (moment(x.travel_to).unix() - moment(x.travel_from).unix()) / (60 * 60 * 24)
      }
      return x;
    })
    this.calMealAllowance(id)
  }
  calMealAllowance(id) {
    this.mealAllowance.map(x => {
      if (x.no === id && x.total && x.total_days) {
        x.grand_total = x.total * x.total_days - (x.deduction || 0)
      }
      return x;
    });
    this.totalMeal = this.mealAllowance.reduce((sum, x) => {
      return sum + (x.grand_total || 0)
    }, 0)
  }
  save(type) {
    switch (type) {
      case BudgetType.land:
        let land = this.landTransport.slice(0);
        land = land.filter((x) => x.grand_total);
        this.requestService.addLandTransport(land).subscribe();
        let landData: RequestInfor = {
          land_transport_expense: this.totalVND
        }
        this.requestService.updateRequest(landData, this.requestInfor.trip_id).subscribe((result)=>{
          this.updateSummary(result.data);
        });
        break;
      case BudgetType.air:
        let data = this.airTransport.slice(0);
        data = data.filter((x) => x);
        this.requestService.addAirTransport(data).subscribe();
        let air: RequestInfor = {
          air_transport_expense: this.firtFee + this.secondFee + this.threeFee
        }
        this.requestService.updateRequest(air, this.trip_id).subscribe((result)=>{
          this.updateSummary(result.data);
        });
        break;
      case BudgetType.ownAccommodation:
        let own = this.ownAccom.slice(0);
        own = own.filter((x) => x);
        this.requestService.addOWnTransport(own).subscribe();
        let ownexpense: RequestInfor = {
          own_accomm_expense: this.totalOwn
        }
        this.requestService.updateRequest(ownexpense, this.trip_id).subscribe((result)=>{
          this.updateSummary(result.data);
        });
        break;
      case BudgetType.hotel:
        let hotel = this.hotelAccom.slice(0);
        hotel = hotel.filter((x) => x);
        this.requestService.addHotelAccom(hotel).subscribe();
        let hotelexpense: RequestInfor = {
          hotel_accomm_expense: this.totalHotel
        }
        this.requestService.updateRequest(hotelexpense, this.trip_id).subscribe((result)=>{
          this.updateSummary(result.data);
        });
        break;
      case BudgetType.meal:
        let meal = this.mealAllowance.slice(0);
        meal = meal.filter((x) => x.grand_total);
        this.requestService.addMeallAccom(meal).subscribe();
        let mealexpense: RequestInfor = {
          meal_allowance: this.totalMeal
        }
        this.requestService.updateRequest(mealexpense, this.trip_id).subscribe((result)=>{
          this.updateSummary(result.data);
        });
        break;
      case BudgetType.beforeReport:
        let dailyBe = this.dailyReport.slice(0);
        dailyBe = dailyBe.filter((x) => x.vanue).map(y => {
          y.from_datetime = (y.from_date || '') + ' ' + (y.from_time || '');
          y.to_datetime = (y.to_date || '') + ' ' + (y.to_time || '');
          return y;
        });
        this.requestService.addDaily(dailyBe).subscribe();
        break;
      default:
        break;
    }
  }
}