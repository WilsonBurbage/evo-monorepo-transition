import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponentClass } from '../../../../core/classes/base-component.class';
import { ACTIVE_PREVIEW_EXPORT_DOCUMENT_TYPE_PROPERTY_NAME } from '../../../../core/constants/active-element.constants';
import {
  ExportDocumentType,
  EXPORT_DOCUMENT_TYPE_NAMES_SENTENCE_CASE_MAP,
} from '../../../../core/models/export-document-type.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { JumpToLink } from '../../../../core/models/jump-to-link.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-jump-to-links-dumb',
  templateUrl: './jump-to-links-dumb.component.html',
  styleUrls: ['./jump-to-links-dumb.component.scss'],
})
export class JumpToLinksDumbComponent extends BaseComponentClass {
  @Input() jumpToLinks!: JumpToLink[];

  @Output() formGroupGenerated = new EventEmitter<FormGroup>();

  previewDocumentSchema!: FormSchema;

  ngOnInit(): void {
    this.previewDocumentSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: ACTIVE_PREVIEW_EXPORT_DOCUMENT_TYPE_PROPERTY_NAME,
              type: FormSchemaItemType.select,
              optionsConfig: {
                options: FormsService.createSelectOptionsFromEnum(
                  ExportDocumentType,
                  EXPORT_DOCUMENT_TYPE_NAMES_SENTENCE_CASE_MAP,
                ),
              },
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.formGroupGenerated.emit(form);
  }

  onJumpToLinkClicked(jumpToLink: JumpToLink): void {
    const rowElement = document.querySelectorAll(
      `[jump-to-id="${jumpToLink.id}"]`,
    )[0];

    rowElement.scrollIntoView({ block: 'center' });

    rowElement.classList.add('jumped-to');
    setTimeout(() => {
      rowElement.classList.remove('jumped-to');
    }, 1000);
  }
}
