import { Component, Input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-admin-page-icon",
  styleUrl: "./admin-page-icon.css",
  templateUrl: "./admin-page-icon.html",
})
export class AdminPageIcon {
  @Input() icon: string = "";
}
