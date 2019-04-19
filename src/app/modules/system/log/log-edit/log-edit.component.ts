import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LogService} from '../log.service';
import {Help} from '../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Log} from '../Log';
import {of} from 'rxjs';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent implements OnInit {


  validateForm: FormGroup;
  isLoading = false;
  obj: Log = new Log();

  constructor(
    private formBuilder: FormBuilder,
    private logService: LogService,
    private route: ActivatedRoute,
    private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.logService.getById(params.get('id'));
        } else {
          return of(new Log());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new Log();
      }
    });

    this.validateForm = this.formBuilder.group({
            
      id: [null, [Validators.required]],
       
      organizationId: [null, [Validators.required]],
       
      optionName: [null, [Validators.required]],
       
      optionType: [null, [Validators.required]],
       
      method: [null, [Validators.required]],
       
      params: [null, [Validators.required]],
       
      userId: [null, [Validators.required]],
       
      ip: [null, [Validators.required]],
       
      executionTime: [null, [Validators.required]],
       
      created: [null, [Validators.required]],
       
      status: [null, [Validators.required]],
       
    });
  }

  submitForm() {
    this.isLoading = true;
    this.logService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
