import { GuidService } from '@evo-monorepo/shared';
import { Injectable } from '@nestjs/common';
import { Solicitor } from '../core/models/solicitor.model';

@Injectable()
export class SolicitorsService {
  solicitors: Solicitor[] = [
    {
      id: GuidService.getGuid('solicitor'),
      name: 'ABC Solicitors',

      address1: '1 ABC Street',
      address2: 'DEF',
      town: 'ABC Town',
      county: 'ABC County',
      postCode: 'AB1 2DE',
      telephone: '01234 567890',
      fax: '01234 567899',
      dx: 'ABC123',
      vatNumber: 'ABC123456789',
    },
    {
      id: GuidService.getGuid('solicitor'),
      name: 'XYZ Solicitors',

      address1: '1 XYZ Street',
      address2: 'UVW',
      town: 'XYZ Town',
      county: 'XYZ County',
      postCode: 'XY1 2ZU',
      telephone: '09876 543210',
      fax: '09876 543211',
      dx: 'XYZ321',
      vatNumber: 'XYZ123456789',
    },
  ];

  lookup(searchString: string): Solicitor[] {
    return this.solicitors.filter((solicitor) =>
      solicitor.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}
