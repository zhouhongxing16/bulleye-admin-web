import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {StaffService} from '../staff.service';
import {Help} from '../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Staff} from '../Staff';
import {of} from 'rxjs';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {


  validateForm: FormGroup;
  isLoading = false;
  obj: Staff = new Staff();

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
        this.obj = d.data;
      } else {
        this.obj = new Staff();
      }
    });

    this.validateForm = this.formBuilder.group({

      serialNo: [null, [Validators.required]],

      name: [null, [Validators.required]],

      birthday: [null, [Validators.required]],

      genderId: [null, [Validators.required]],

      academicId: [null, [Validators.required]],

      degreeId: [null, [Validators.required]],

      avatar: [null, [Validators.required]],

      departmentId: [null, [Validators.required]],

      positionId: [null, [Validators.required]],

      titleId: [null, [Validators.required]],

      typeId: [null, [Validators.required]],

      mobile: [null, [Validators.required]],

      identifyTypeId: [null, [Validators.required]],

      identifyNo: [null, [Validators.required]],

      email: [null, [Validators.required]],

      remark: [null, null],

      status: [null, [Validators.required]],

      birthProvinceId: [null, [Validators.required]],

      birthCityId: [null, [Validators.required]],

      policy: [null, [Validators.required]],

      weight: [null, [Validators.required]],

      height: [null, [Validators.required]],

      healthStatus: [null, [Validators.required]],

      marryStatusId: [null, [Validators.required]],

      nationId: [null, [Validators.required]],

      vmnetNo: [null, [Validators.required]],

      joinDate: [null, [Validators.required]],

    });
  }

  submitForm() {
    this.isLoading = true;
    this.staffService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
