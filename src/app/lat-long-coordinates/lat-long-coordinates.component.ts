import { Component, OnInit } from "@angular/core";
import { LatLongCoordinatesService } from "./lat-long-coordinates.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

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
  city = [];

  constructor(
    private latLongCoordinatesService: LatLongCoordinatesService,
    private formBuilder: FormBuilder
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
    if (this.coordinatesForm.invalid) {
      return;
    }
    const getcityName = this.coordinatesForm.value.cityName;
    this.subscription = this.latLongCoordinatesService
      .getCoordValues(getcityName)
      .subscribe(
        res => {
          this.city = res;
          if(res.status === "OK") {
          this.getData = res["results"][0].geometry.location;
          } else {
            alert("Enter proper city name");
          }
        },
        error => {
          alert(error);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
