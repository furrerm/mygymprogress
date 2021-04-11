import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FilterGroupDTO} from '../model/swagger-model/filterGroupDTO';
import {ConstantsService} from './constants.service';
import {FilterService} from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  filterGroups: BehaviorSubject<FilterGroupDTO[]> = new BehaviorSubject<FilterGroupDTO[]>([]);

  constructor(
    private constants: ConstantsService,
    private filterService: FilterService) {
  }

  getFilters(): BehaviorSubject<FilterGroupDTO[]> {
    if (this.filterGroups.getValue().length === 0) {
      this.loadFilters();
    }
    return this.filterGroups;
  }

  loadFilters(): void {
    this.filterService.getAllFilterGroups().subscribe(filterGroups => {
      this.filterGroups.next(filterGroups);
    });
  }

}
