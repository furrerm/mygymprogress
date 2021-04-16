import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterGroupDTO} from '../../core/model/swagger-model/filterGroupDTO';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  private activeFilters: FilterGroupDTO[] = [];

  private _filterDivExpanded = false;
  @Input() filterGroups: FilterGroupDTO[];
  @Output() filterGroupsEvent: EventEmitter<FilterGroupDTO[]> = new EventEmitter<FilterGroupDTO[]>();
  @Output() filterEvent: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @ViewChild('filterContainer') filterContainer;

  constructor() { }

  ngOnInit(): void {
  }

  get filterDivExpanded(): boolean {
    return this._filterDivExpanded;
  }

  filterChosen(filterGroup: FilterGroupDTO, singleFilter: string): boolean {
    const activeFilterGroup = this.activeFilters.find(a => a.name === filterGroup.name);
    if (activeFilterGroup != null) {
      return activeFilterGroup.filter.includes(singleFilter);
    }
    return false;
  }

  public addFilter(filterGroup: FilterGroupDTO, singleFilter: string): void {
    const chosenFilterGroup: FilterGroupDTO = this.activeFilters.find(a => a.name === filterGroup.name);
    if (chosenFilterGroup != null) {
      const indexOfFilter = chosenFilterGroup.filter.indexOf(singleFilter, 0);
      if (indexOfFilter > -1) {
        chosenFilterGroup.filter.splice(indexOfFilter, 1);
        if (chosenFilterGroup.filter.length === 0) {
          this.activeFilters = this.activeFilters.filter(a => a.name !== chosenFilterGroup.name);
        }
      } else {
        chosenFilterGroup.filter.push(singleFilter);
      }
    } else {
      this.activeFilters.push({name: filterGroup.name, filter: [singleFilter]});
    }
  }

  expandCollapseFilterDiv(): void {
    this._filterDivExpanded = this._filterDivExpanded === false ? true : false;
  }

  emitFilterGroups(): void {
    this.filterGroupsEvent.emit(this.activeFilters);
    const filtersArrays = this.activeFilters.map(a => a.filter);
    const filters = [].concat(...filtersArrays);
    this.filterEvent.emit(filters);
  }
}
