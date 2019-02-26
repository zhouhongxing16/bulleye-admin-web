import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {StaffService} from '../staff.service';
import {Help} from '../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Staff} from '../staff';
import {of} from 'rxjs';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {
  validateForm: FormGroup;
  isLoading = false;
  data: {
    id: string;
    serialNo: string;
    name: string;
    birthday: string;
    mobile: string;
    email: string;
    genderId: string;
    nationId: string;
    identifyNo: string;
    academicId: string;
    degreeId: string;
    avatar: string;
    organizationId: string;
    departmentId: string;
    positionId: string;
    titleId: string;
    status: number;
    created: any;
  };

  constructor(
    private formBuilder: FormBuilder,
    private staffService: StaffService,
    private route: ActivatedRoute,
    private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.staffService.getById(params.get('id'));
        } else {
          return of(new Staff());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        console.log('获取数据：' + d.data);
        this.data = d.data;
        console.log('对象数据：' + this.data);
      } else {
        return of(this.data);
      }
    });
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      serialNo: [null, [Validators.required]],
      status: [null, [Validators.required]],
      remark: [null]
    });
  }

  submitForm() {
    this.isLoading = true;
    this.staffService.saveOrUpdateData(this.data).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
      }
    });
  }

}
