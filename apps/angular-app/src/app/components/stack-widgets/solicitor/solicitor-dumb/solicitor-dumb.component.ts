import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { Solicitor } from '../../../../core/models/solicitor.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-solicitor-dumb',
  templateUrl: './solicitor-dumb.component.html',
  styleUrls: ['./solicitor-dumb.component.scss'],
})
export class SolicitorDumbComponent
  extends StackWidgetDumbComponentClass<Solicitor>
  implements OnInit
{
  @Input() solicitor!: Solicitor;

  @Output() search = new EventEmitter();

  solicitorSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.solicitorSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'name',
              label: 'Name',
              type: FormSchemaItemType.text,
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'address1',
              label: 'Address 1',
              type: FormSchemaItemType.text,
            },
            {
              controlName: 'address2',
              label: 'Address 2',
              type: FormSchemaItemType.text,
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'town',
              label: 'Town',
              type: FormSchemaItemType.text,
            },
            {
              controlName: 'county',
              label: 'County',
              type: FormSchemaItemType.text,
            },
            {
              controlName: 'postCode',
              label: 'Post code',
              type: FormSchemaItemType.text,
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'fax',
              label: 'Fax',
              type: FormSchemaItemType.text,
            },
            {
              controlName: 'dx',
              label: 'DX',
              type: FormSchemaItemType.text,
            },
            {
              controlName: 'vatNumber',
              label: 'VAT number',
              type: FormSchemaItemType.text,
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.solicitor,
      form,
      this.solicitorSchema,
    );

    this.inputsChanged = (): void => {
      FormsService.patchItemIntoFormValue(
        this.solicitor,
        form,
        this.solicitorSchema,
      );
    };
  }

  onSearchClicked(): void {
    this.search.emit();
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.solicitor,
        this.form,
        this.solicitorSchema,
      ),
    );
  }
}
