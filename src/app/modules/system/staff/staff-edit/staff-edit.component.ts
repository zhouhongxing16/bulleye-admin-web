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

      id: [null, null],

      serialNo: [null, [Validators.required]],

      name: [null, [Validators.required]],

      genderId: [null, [Validators.required]],

      mobile: [null, [Validators.required]],

      email: [null, [Validators.required]],

      avatar: [null, [Validators.required]],

      departmentId: [null, [Validators.required]],

      birthday: [null, [Validators.required]],

      academicId: [null, [Validators.required]],

      degreeId: [null, [Validators.required]],

      positionId: [null, [Validators.required]],

      titleId: [null, [Validators.required]],

      typeId: [null, [Validators.required]],

      identifyTypeId: [null, null],

      identifyNo: [null, null],

      status: [null, [Validators.required]],

      birthProvinceId: [null, null],

      birthCityId: [null, null],

      policy: [null, null],

      nationId: [null, null],

      joinDate: [null, null],

      remark: [null, null],

      created: [null, null],

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
