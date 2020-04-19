import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  exercise: string;


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
     // console.log('rout param = ' + params.get('exercise'));
      this.exercise = JSON.parse(params.get('id'));
    });
    this.route.paramMap.subscribe( paramMap => {
      this.exercise = paramMap.get('id');
    });
  }

}
