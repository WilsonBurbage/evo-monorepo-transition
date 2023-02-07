import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AttendanceModule } from '../../stack-widgets/attendance/attendance.module';
import { AttendancesModule } from '../../stack-widgets/attendances/attendances.module';
import { BillSetupModule } from '../../stack-widgets/bill-setup/bill-setup.module';
import { CasePartyModule } from '../../stack-widgets/case-party/case-party.module';
import { ChronologyStepModule } from '../../stack-widgets/chronology-step/chronology-step.module';
import { ChronologyModule } from '../../stack-widgets/chronology/chronology.module';
import { ConfirmModule } from '../../stack-widgets/confirm/confirm.module';
import { CorrespondenceCounterModule } from '../../stack-widgets/correspondence-counter/correspondence-counter.module';
import { CounselModule } from '../../stack-widgets/counsel/counsel.module';
import { CounselsModule } from '../../stack-widgets/counsels/counsels.module';
import { CoverSheetDetailsModule } from '../../stack-widgets/cover-sheet-details/cover-sheet-details.module';
import { CoverSheetItemModule } from '../../stack-widgets/cover-sheet-item/cover-sheet-item.module';
import { CoverSheetsModule } from '../../stack-widgets/cover-sheets/cover-sheets.module';
import { DisbursementModule } from '../../stack-widgets/disbursement/disbursement.module';
import { DisbursementsModule } from '../../stack-widgets/disbursements/disbursements.module';
import { DocumentsItemModule } from '../../stack-widgets/documents-item/documents-item.module';
import { DocumentsModule } from '../../stack-widgets/documents/documents.module';
import { EnhancementModule } from '../../stack-widgets/enhancement/enhancement.module';
import { EnhancementsModule } from '../../stack-widgets/enhancements/enhancements.module';
import { ExportModule } from '../../stack-widgets/export/export.module';
import { FeeEarnerModule } from '../../stack-widgets/fee-earner/fee-earner.module';
import { HomeModule } from '../../stack-widgets/home/home.module';
import { NarrativeModule } from '../../stack-widgets/narrative/narrative.module';
import { OtherWorkModule } from '../../stack-widgets/other-work/other-work.module';
import { PartModule } from '../../stack-widgets/part/part.module';
import { PartiesModule } from '../../stack-widgets/parties/parties.module';
import { PartsModule } from '../../stack-widgets/parts/parts.module';
import { PartyModule } from '../../stack-widgets/party/party.module';
import { RateGroupModule } from '../../stack-widgets/rate-group/rate-group.module';
import { RateModule } from '../../stack-widgets/rate/rate.module';
import { RatesModule } from '../../stack-widgets/rates/rates.module';
import { SettingsModule } from '../../stack-widgets/settings/settings.module';
import { SolicitorLookupModule } from '../../stack-widgets/solicitor-lookup/solicitor-lookup.module';
import { SolicitorModule } from '../../stack-widgets/solicitor/solicitor.module';
import { SuccessFeeModule } from '../../stack-widgets/success-fee/success-fee.module';
import { SuccessFeesModule } from '../../stack-widgets/success-fees/success-fees.module';
import { TextReplacementModule } from '../../stack-widgets/text-replacement/text-replacement.module';
import { TextReplacementsModule } from '../../stack-widgets/text-replacements/text-replacements.module';
import { ActiveElementSelectorModule } from '../active-element-selector/active-element-selector.module';
import { JumpToLinksModule } from '../jump-to-links/jump-to-links.module';
import { PartQuickLinksModule } from '../part-quick-links/part-quick-links.module';
import { PreviewModule } from '../preview/preview.module';
import { AtomsModule } from './../../atoms/atoms.module';
import { MoleculesModule } from './../../molecules/molecules.module';
import { BillEditorDumbComponent } from './bill-editor-dumb/bill-editor-dumb.component';
import { BillEditorSmartComponent } from './bill-editor-smart/bill-editor-smart.component';

const allComponents = [BillEditorSmartComponent, BillEditorDumbComponent];

@NgModule({
  imports: [
    ActiveElementSelectorModule,
    AtomsModule,
    AttendanceModule,
    AttendancesModule,
    BillSetupModule,
    CasePartyModule,
    ChronologyModule,
    ChronologyStepModule,
    CommonModule,
    ConfirmModule,
    CorrespondenceCounterModule,
    CounselModule,
    CounselsModule,
    CoverSheetDetailsModule,
    CoverSheetItemModule,
    CoverSheetsModule,
    DisbursementModule,
    DisbursementsModule,
    DocumentsItemModule,
    DocumentsModule,
    EnhancementModule,
    EnhancementsModule,
    ExportModule,
    FeeEarnerModule,
    HomeModule,
    JumpToLinksModule,
    MoleculesModule,
    NarrativeModule,
    OtherWorkModule,
    PartModule,
    PartQuickLinksModule,
    PartiesModule,
    PartsModule,
    PartyModule,
    PipesModule,
    PreviewModule,
    RateGroupModule,
    RateModule,
    RatesModule,
    SettingsModule,
    SolicitorLookupModule,
    SolicitorModule,
    SuccessFeeModule,
    SuccessFeesModule,
    TextReplacementModule,
    TextReplacementsModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class BillEditorModule {}
