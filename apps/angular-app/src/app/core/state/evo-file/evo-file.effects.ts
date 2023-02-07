import { Injectable } from '@angular/core';
import { CryptoService, FileData } from '@evo-monorepo/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { EXAMPLE_CUSTOMISABLE_BILL } from '../../constants/example-customisable-bill.constants';
import { EXAMPLE_3_COLUMN_BILL } from '../../constants/example-pro-bill-3-column.constants';
import { EvoFile } from '../../models/evo-file.model';
import { MenuItemId } from '../../models/menu-item-id.model';
import { StackWidgetReference } from '../../models/stack-widget-reference.model';
import { DefaultsService } from '../../services/defaults.service';
import { EvoFileService } from '../../services/evo-file.service';
import { GlobalState } from '../reducers';
import * as attendancesActions from './../attendances/attendances.actions';
import * as billSetupActions from './../bill-setup/bill-setup.actions';
import * as casePartiesActions from './../case-parties/case-parties.actions';
import * as chronologyStepsActions from './../chronology-steps/chronology-steps.actions';
import * as correspondenceCountersActions from './../correspondence-counters/correspondence-counters.actions';
import * as counselsActions from './../counsels/counsels.actions';
import * as coverSheetDetailsActions from './../cover-sheet-details/cover-sheet-details.actions';
import * as coverSheetItemsActions from './../cover-sheet-items/cover-sheet-items.actions';
import * as disbursementsActions from './../disbursements/disbursements.actions';
import * as documentsItemsActions from './../documents-items/documents-items.actions';
import * as enhancementsActions from './../enhancements/enhancements.actions';
import * as evoFileActions from './../evo-file/evo-file.actions';
import * as feeEarnersActions from './../fee-earners/fee-earners.actions';
import * as menuActions from './../menu/menu.actions';
import * as narrativeActions from './../narrative/narrative.actions';
import * as partiesActions from './../parties/parties.actions';
import * as partsActions from './../parts/parts.actions';
import * as rateGroupsActions from './../rate-groups/rate-groups.actions';
import * as ratesActions from './../rates/rates.actions';
import * as solicitorsActions from './../solicitors/solicitors.actions';
import * as successFeesActions from './../success-fees/success-fees.actions';
import * as uiActions from './../ui/ui.actions';
import * as evoFileSelectors from './evo-file.selectors';

@Injectable()
export class EvoFileEffects {
  menuItemClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(menuActions.menuItemClicked),
      withLatestFrom(
        this.store$.select(evoFileSelectors.getEvoFileHasChangedSinceSave)
      ),
      mergeMap(([{ menuItemId }, evoFileHasChangedSinceSave]) => {
        let requireConfirmation = false;
        let confirmAction: TypedAction<string>;

        switch (menuItemId) {
          case MenuItemId.new:
            confirmAction = evoFileActions.newEvoFile();
            requireConfirmation = true;
            break;

          case MenuItemId.open:
            confirmAction = evoFileActions.openEvoFile();
            requireConfirmation = true;
            break;

          case MenuItemId.openExample: {
            const fileData: FileData<EvoFile> = {
              filePath: '',
              data: EXAMPLE_3_COLUMN_BILL,
            };

            confirmAction = evoFileActions.openEvoFileSuccess({
              fileData,
              hash: '',
            });

            break;
          }

          case MenuItemId.save:
            confirmAction = evoFileActions.saveEvoFile({ saveAs: false });
            break;

          case MenuItemId.saveAs:
            confirmAction = evoFileActions.saveEvoFile({ saveAs: true });
            break;

          default:
            return [];
        }

        return requireConfirmation && evoFileHasChangedSinceSave
          ? [
              uiActions.pushStackWidget({
                stackWidgetReference: StackWidgetReference.confirm,
                config: {
                  confirmMessage: 'Any changes will be lost. Continue?',
                  confirmActions: [confirmAction!],
                },
              }),
            ]
          : [confirmAction!];
      })
    )
  );

  newEvoFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(evoFileActions.newEvoFile),
      map(() => {
        const newEvoFiles = {
          freshBill: DefaultsService.createDefaultEvoFile(),
          customisableBill: EXAMPLE_CUSTOMISABLE_BILL,
          threeColumnBill: EXAMPLE_3_COLUMN_BILL,
        };

        const fileData: FileData<EvoFile> = {
          filePath: '',
          data: newEvoFiles.threeColumnBill,
        };

        return evoFileActions.openEvoFileSuccess({
          fileData,
          hash: '',
        });
      })
    )
  );

  openEvoFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(evoFileActions.openEvoFile),
      switchMap(async () => {
        const fileData = await EvoFileService.openEvoFile();

        if (fileData) {
          const hash = CryptoService.hash(JSON.stringify(fileData.data));
          return evoFileActions.openEvoFileSuccess({ fileData, hash });
        } else {
          return evoFileActions.openEvoFileFailure();
        }
      })
    )
  );

  openEvoFileSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(evoFileActions.openEvoFileSuccess),
      mergeMap(({ fileData }) => [
        uiActions.setBillIsFullyLoaded({ billIsFullyLoaded: false }),

        attendancesActions.setAttendances({
          attendances: fileData.data.attendances,
        }),
        billSetupActions.setBillSetup({ billSetup: fileData.data.billSetup }),
        casePartiesActions.setCaseParties({
          caseParties: fileData.data.caseParties,
        }),
        chronologyStepsActions.setChronologySteps({
          chronologySteps: fileData.data.chronologySteps,
        }),
        correspondenceCountersActions.setCorrespondenceCounters({
          correspondenceCounters: fileData.data.correspondenceCounters,
        }),
        counselsActions.setCounsels({ counsels: fileData.data.counsels }),
        coverSheetDetailsActions.setCoverSheetDetails({
          coverSheetDetails: fileData.data.coverSheetDetails,
        }),
        coverSheetItemsActions.setCoverSheetItems({
          coverSheetItems: fileData.data.coverSheetItems,
        }),
        disbursementsActions.setDisbursements({
          disbursements: fileData.data.disbursements,
        }),
        documentsItemsActions.setDocumentsItems({
          documentsItems: fileData.data.documentsItems,
        }),
        enhancementsActions.setEnhancements({
          enhancements: fileData.data.enhancements,
        }),
        feeEarnersActions.setFeeEarners({
          feeEarners: fileData.data.feeEarners,
        }),
        narrativeActions.setNarrative({ narrative: fileData.data.narrative }),
        partiesActions.setParties({ parties: fileData.data.parties }),
        partsActions.setParts({ parts: fileData.data.parts }),
        rateGroupsActions.setRateGroups({
          rateGroups: fileData.data.rateGroups,
        }),
        ratesActions.setRates({ rates: fileData.data.rates }),
        solicitorsActions.setSolicitors({
          solicitors: fileData.data.solicitors,
        }),
        successFeesActions.setSuccessFees({
          successFees: fileData.data.successFees,
        }),

        uiActions.setActivePartId({ partId: fileData.data.parts[0].id }),
        uiActions.setActiveFeeEarnerId({
          feeEarnerId: fileData.data.feeEarners[0].id,
        }),
        uiActions.setActiveFeeEarnerId({
          feeEarnerId: fileData.data.feeEarners[0].id,
        }),
        uiActions.clearStackWidgets(),

        uiActions.setBillIsFullyLoaded({ billIsFullyLoaded: true }),

        evoFileActions.upgradeEvoFile(),
      ])
    )
  );

  saveEvoFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(evoFileActions.saveEvoFile),
      withLatestFrom(
        this.store$.select(evoFileSelectors.getFilePath),
        this.store$.select(evoFileSelectors.getCompiledEvoFile)
      ),
      switchMap(async ([{ saveAs }, filePath, compiledEvoFile]) => {
        const result = await EvoFileService.saveEvoFile(
          saveAs ? '' : filePath!,
          compiledEvoFile
        );

        if (result) {
          const fileData: FileData<EvoFile> = {
            filePath: result!,
            data: compiledEvoFile,
          };
          const hash = CryptoService.hash(JSON.stringify(compiledEvoFile));

          return evoFileActions.saveEvoFileSuccess({
            fileData,
            hash,
          });
        } else {
          return evoFileActions.saveEvoFileFailure();
        }
      })
    )
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
