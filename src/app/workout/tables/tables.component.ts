import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CurrentSetComponent} from './current-set/current-set.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  @ViewChild(CurrentSetComponent, {static: true}) child: CurrentSetComponent;
  exercise: string;
  myForm2: FormGroup;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('rout param = ' + params.get('exercise'));
      this.exercise = JSON.parse(params.get('exercise'));

    });
    this.initializeInputValues(12, 30);
  }
  pushToChild(form: FormGroup) {
    this.child.onSubmit(form);
    this.initializeInputValues(12, 30);
  }
  pushToDB(): void {
    this.child.pushToDB();
  }
  private initializeInputValues(repetitionsValue: number, weightValue: number){
    this.myForm2 = this.formBuilder.group({
      weight: weightValue,
      repetitions: repetitionsValue
    });
  }
}
