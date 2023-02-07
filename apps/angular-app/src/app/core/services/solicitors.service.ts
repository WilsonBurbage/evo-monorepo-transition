import { Solicitor } from '../models/solicitor.model';

export class SolicitorsService {
  static getCompletedValues(
    solicitor: Solicitor,
    includeName = true,
  ): string[] {
    return [
      includeName ? solicitor.name : '',
      solicitor.address1,
      solicitor.address2,
      solicitor.town,
      solicitor.county,
      solicitor.postCode,
      solicitor.telephone ? `Telephone: ${solicitor.telephone}` : '',
      solicitor.fax ? `Fax: ${solicitor.fax}` : '',
      solicitor.dx ? `DX: ${solicitor.dx}` : '',
    ].filter((value) => Boolean(value));
  }
}
