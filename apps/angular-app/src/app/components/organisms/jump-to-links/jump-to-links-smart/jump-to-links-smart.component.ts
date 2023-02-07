import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { ACTIVE_PREVIEW_EXPORT_DOCUMENT_TYPE_PROPERTY_NAME } from '../../../../core/constants/active-element.constants';
import { ExportDocumentType } from '../../../../core/models/export-document-type.model';
import { JumpToLink } from '../../../../core/models/jump-to-link.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';
import * as exportSelectors from './../../../../core/state/export/export.selectors';
import * as uiActions from './../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-jump-to-links-smart',
  templateUrl: './jump-to-links-smart.component.html',
  styleUrls: ['./jump-to-links-smart.component.scss'],
})
export class JumpToLinksSmartComponent extends BaseComponentClass {
  jumpToLinks$: Observable<JumpToLink[] | undefined>;

  form!: FormGroup;

  constructor(injector: Injector) {
    super(injector);

    this.jumpToLinks$ = this.store$.select(
      exportSelectors.getExportJumpToLinks,
    );
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    this.form.controls[
      ACTIVE_PREVIEW_EXPORT_DOCUMENT_TYPE_PROPERTY_NAME
    ].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) =>
        this.store$.dispatch(
          uiActions.setActivePreviewExportDocumentType({
            previewExportDocumentType: value,
          }),
        ),
      );

    this.form.patchValue({
      [ACTIVE_PREVIEW_EXPORT_DOCUMENT_TYPE_PROPERTY_NAME]:
        ExportDocumentType.frontSheet,
    });
  }
}
