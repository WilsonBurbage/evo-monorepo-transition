import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { Solicitor } from '../../../../core/models/solicitor.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import { SolicitorsService } from '../../../../core/services/solicitors.service';

@Component({
  selector: 'app-solicitor-lookup-dumb',
  templateUrl: './solicitor-lookup-dumb.component.html',
  styleUrls: ['./solicitor-lookup-dumb.component.scss'],
})
export class SolicitorLookupDumbComponent
  extends StackWidgetDumbComponentClass<Solicitor>
  implements OnInit
{
  @Input() solicitors!: Solicitor[];
  @Input() searching!: boolean;

  @Output() search = new EventEmitter<string>();
  @Output() selectSolicitorClicked = new EventEmitter<Solicitor>();

  solicitorLookupSchema!: FormSchema;

  form!: FormGroup;

  tableConfig: TableConfig<Solicitor> = {
    columns: [
      {
        title: 'Name',
        valuePropertyPath: 'name',
      },
      {
        title: 'Details',
        valueMethod: (solicitor): string =>
          SolicitorsService.getCompletedValues(solicitor, false).join(','),
      },
    ],
  };

  ngOnInit(): void {
    this.solicitorLookupSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'searchString',
              label: 'Search',
              type: FormSchemaItemType.text,
            },
          ],
        },
      ],
    };
  }

  performSearch(): void {
    const searchString = this.form.controls['searchString'].value;
    if (searchString) {
      this.search.emit(searchString);
    }
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    this.form.controls['searchString'].valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(500))
      .subscribe(() => this.performSearch());
  }

  onSearchClicked(): void {
    this.performSearch();
  }

  onSelectSolicitorClicked(
    eventPayload: TableRowEventPayload<Solicitor>,
  ): void {
    this.selectSolicitorClicked.emit(eventPayload.tableItem);
  }
}
