import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input} from '@angular/core';
import {Datum} from "../../../model/ArtworkResponse";
import {CONFIG} from "../../../consts/config";

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements AfterContentInit{

  @Input() datum: Datum;
  imageUrl = CONFIG.FALLBACK_IMAGE_URL;
  formattedYearAndLocation: string;

  constructor() {
  }
  ngAfterContentInit(): void {
    this.imageUrl = this.datum?.image_id ? `https://www.artic.edu/iiif/2/${this.datum.image_id}/${CONFIG.REGION}/${CONFIG.SIZE}/${CONFIG.ROTATION}/${CONFIG.QUALITY}.${CONFIG.FORMAT}` : CONFIG.FALLBACK_IMAGE_URL;
    if (!this.datum.date_start && !this.datum.date_end){
      this.formattedYearAndLocation = this.datum.place_of_origin;
    } else if (this.datum.date_start === this.datum.date_end){
      this.formattedYearAndLocation = `${this.datum.place_of_origin} (${this.datum.date_start})`;
    } else {
      this.formattedYearAndLocation = `${this.datum.place_of_origin} (${this.datum.date_start} - ${this.datum.date_end})`;
    }
  }

}
