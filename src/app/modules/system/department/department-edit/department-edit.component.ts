import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {DepartmentService} from '../department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
  }

}
