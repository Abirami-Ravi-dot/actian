import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { LatLongCoordinatesService } from "src/app/service/lat-long-coordinates.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-lat-long-coordinates",
  templateUrl: "./lat-long-coordinates.component.html",
  styleUrls: ["./lat-long-coordinates.component.scss"]
})
export class LatLongCoordinatesComponent implements OnInit {
  alpha_pattern = "[a-zA-Z]*";
  coordinatesForm: FormGroup;
  submitted = false;
  getData: any;
  subscription: any;
  disableCoord = false;
  city = [];
  loading: boolean;

  constructor(
    private latLongCoordinatesService: LatLongCoordinatesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.coordinatesForm = this.formBuilder.group({
      cityName: [
        "",
        [Validators.required, Validators.pattern(this.alpha_pattern)]
      ]
    });
  }

  get formValue() {
    return this.coordinatesForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.coordinatesForm.invalid) {
      return;
    }
    const getcityName = this.coordinatesForm.value.cityName;
    this.subscription = this.latLongCoordinatesService
      .getCoordValues(getcityName)
      .subscribe(
        res => {
          this.submitted = false;
          this.loading = false;
          this.city = res;
          if (res.status === "OK") {
            this.getData = res["results"][0].geometry.location;
            this.disableCoord = false;
            this.toastr.success(
              "success",
              "latitude and longitude for given city is fetched successfully",
              { timeOut: 2000 }
            );
          } else {
            this.disableCoord = true;
            this.toastr.error("error", "Enter valid city name", {
              timeOut: 2000
            });
          }
        },
        error => {
          this.disableCoord = true;
          this.toastr.error("error", "Internal errors", { timeOut: 2000 });
        }
      );
  }
  onKeyUp() {
    this.getData = "";
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
