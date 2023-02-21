import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArtworkResponse, Datum} from "../../model/ArtworkResponse";
import {
  NxDropdownComponent,
  NxDropdownItemChange,
  NxMultiSelectComponent
} from "@aposin/ng-aquila/dropdown";
import {CONFIG} from "../../consts/config";

interface StyleTitleAndCount {
  name: string;
  count: number;
}

type SortOption = 'Name'| 'Artist'| 'Date'

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})

export class ArtworksComponent implements OnInit{

  @ViewChild('nxMultiSelectComponent') nxMultiSelectComponent: NxMultiSelectComponent<any, any>;
  @ViewChild('nxDropdownComponent') nxDropdownComponent: NxDropdownComponent;

  currentArtworksApiRes: ArtworkResponse;
  filteredData: Datum[];
  currentPage = 1;
  limit = 8;
  totalItems = 1;
  sortOptions: SortOption[] = ['Name', 'Artist', 'Date'];
  complexOptions: StyleTitleAndCount[];

  constructor(
    private httpClient: HttpClient
  ){

  }
  ngOnInit(): void {
    this.loadPage(1);
  }

  private loadPage(page: number){
    // this.httpClient.get<ArtworkResponse>(`https://api.artic.edu/api/v1/artworks`).toPromise().then(res => {
    this.httpClient.get<ArtworkResponse>(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${this.limit}&fields=${CONFIG.ART_CHICAGO_FIELDS}`).toPromise().then(res => {
      console.log('response >>> ', res);
      if (res){
        this.currentPage = res.pagination.current_page;
        this.totalItems = res.pagination.total;
        this.currentArtworksApiRes = res;
        const currentSortBy = this.nxDropdownComponent.value;
        if (currentSortBy){
          this.doSort(currentSortBy, res.data);
        } else {
          this.filteredData = res.data;
        }
        this.complexOptions = [];
        const tempComplexOptions: StyleTitleAndCount[] = [];
        this.nxMultiSelectComponent.selectedItems.clear();
        for (const data of res.data){
          data.style_titles.forEach(styleTitle => {
            const complexOptionFound = tempComplexOptions.find(complexOption => complexOption.name === styleTitle);
            if(!complexOptionFound){
              tempComplexOptions.push({
                name: styleTitle,
                count: 1
              })
            } else {
              complexOptionFound.count = complexOptionFound.count+1;
            }
          })
        }
        this.complexOptions = tempComplexOptions;
      }
    })
  }

  selectStylesLabel(option: StyleTitleAndCount): string {
    return `${option.name} (${option.count})`;
  }

  selectStylesValue(option: StyleTitleAndCount): string {
    return option.name;
  }

  prevPage() {
    if(this.currentPage === 1){
      return;
    }
    this.loadPage(this.currentPage - 1);
  }

  nextPage() {
    if(this.currentPage === this.currentArtworksApiRes.pagination.total_pages){
      return;
    }
    this.loadPage(this.currentPage + 1);
  }

  goToPage($event: number) {
    this.loadPage($event)
  }

  onStylesSelectionChange(selectedList: string[]) {
    const temp = this.currentArtworksApiRes.data;
    if(selectedList.length > 0){
      this.filteredData = temp.filter(data => {
        return selectedList.map((selected: string) => {
          return data.style_titles.includes(selected);
        }).includes(true);
      });
    } else {
      this.filteredData = temp;
    }
  }

  onSortSelectionChange($event: NxDropdownItemChange) {
    const sortOption = $event.item.value;
    const isUserInput = $event.isUserInput; //due to NxDropdownItemChange event emits 2 output event when select, only one with isUserInput is valid for use
    if (sortOption && isUserInput){
      this.doSort(sortOption)
    }
  }
  private doSort(sortOption: SortOption, datum?: Datum[]){
    const doSortLogic = (a: Datum, b: Datum) => {
      if(sortOption === 'Name'){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
      } else if (sortOption === 'Artist'){
        if(a.artist_display < b.artist_display) { return -1; }
        if(a.artist_display > b.artist_display) { return 1; }
        return 0;
      } else if (sortOption === 'Date'){
        if(a.date_start < b.date_start) { return -1; }
        if(a.date_start > b.date_start) { return 1; }
        return 0;
      }
      return 0;
    }

    if(datum){
      this.filteredData = datum.sort((a,b) => doSortLogic(a,b));
    } else {
      this.filteredData.sort((a,b) => doSortLogic(a,b));
    }
  }
}
