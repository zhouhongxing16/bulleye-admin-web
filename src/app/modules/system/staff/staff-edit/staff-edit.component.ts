import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup, NgForm,
  Validators
} from '@angular/forms';
import {StaffService} from '../staff.service';
import {Help} from '../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Staff} from '../Staff';
import {Observable, Observer, of} from 'rxjs';
import {UploadFile} from 'ng-zorro-antd';

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

      avatar: [null, null],

      departmentId: [null, [Validators.required]],

      birthday: [null, [Validators.required]],

      academicId: [null, null],

      degreeId: [null, null],

      positionId: [null, null],

      titleId: [null, null],

      typeId: [null, null],

      identifyTypeId: [null, null],

      identifyNo: [null, null],

      status: [null, [Validators.required]],

      birthProvinceId: [null, null],

      birthCityId: [null, null],

      policy: [null, null],

      nationId: [null, null],

      joinDate: [null, null],

      remark: [null, null],
    });
  }


  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.help.showMessage('error', '只能上传 JPG 文件');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.help.showMessage('error', '文件大小不能超过2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.help.showMessage('error', 'Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.isLoading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.isLoading = false;
          this.obj.avatar = info.file.response.url;
        });
        break;
      case 'error':
        this.help.showMessage('error', '网络错误！');
        this.isLoading = false;
        break;
    }
  }

  submitForm() {
    this.isLoading = true;
    this.obj.birthday = this.help.formatDate(this.obj.birthday, 'yyyy-MM-dd');
    this.obj.joinDate = this.help.formatDate(this.obj.joinDate, 'yyyy-MM-dd');
    this.staffService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
