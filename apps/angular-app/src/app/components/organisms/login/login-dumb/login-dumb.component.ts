import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { TextInputType } from '../../../../core/models/text-input-type.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';
import { LOCAL_STORAGE_KEY_USERNAME } from './../../../../core/constants/local-storage.constants';
import { FormSchemaItemType } from './../../../../core/models/form-schema-item-type.model';
import { LocalStorageService } from './../../../../core/services/local-storage.service';

@Component({
  selector: 'app-login-dumb',
  templateUrl: './login-dumb.component.html',
  styleUrls: ['./login-dumb.component.scss'],
})
export class LoginDumbComponent extends BaseComponentClass implements OnInit {
  @Input() isAuthenticating!: boolean;
  @Input() hasAuthenticatingError!: boolean;
  @Input() errorCode!: number;

  @Output() loginClicked = new EventEmitter<{
    username: string;
    password: string;
  }>();

  loginSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.loginSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'username',
              label: 'Username',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'password',
              label: 'Password',
              type: FormSchemaItemType.text,
              textInputConfig: { textInputType: TextInputType.password },
              validators: [Validators.required],
            },
          ],
        },
      ],
    };
  }

  getErrorText(): string {
    switch (this.errorCode) {
      case 401:
        return 'Your login details were not recognised. Please check and try again...';

      default:
        return '';
    }
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;
    this.form.patchValue({
      username: LocalStorageService.getLocalStorage(LOCAL_STORAGE_KEY_USERNAME),
      password: 'aBc123!',
    });
  }

  onLoginClicked(): void {
    this.loginClicked.emit({
      username: this.form?.value.username,
      password: this.form?.value.password,
    });
  }
}
