import { IFollowService } from 'Interfaces/IServices/IFollowService';
import { BaseService } from 'shared/Services/BaseService';
import { ClientVendorFollow } from './Follow.model';
import { IFollowRepository } from 'Interfaces/IRepositories/IFollowRepository';
import { Inject } from '@nestjs/common';
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from 'shared/constants';
import { privateDecrypt } from 'crypto';
import { IVendorService } from 'Interfaces/IServices/IVendorService';

export class FollowService
  extends BaseService<ClientVendorFollow>
  implements IFollowService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.IFollowRepository)
    private readonly followRepository: IFollowRepository,
    @Inject(SERVICE_TOKENS.IVendorService)
    private readonly vendorService: IVendorService,
  ) {
    super(followRepository);
  }
  async followUnFollow(vendorId: string, clientId: string): Promise<String> {
    await this.vendorService.findOne({ where: { userId: vendorId } });

    const followResult = await this.followRepository.checkIFExists({
      where: { vendorId: vendorId, clientId: clientId },
    });
    if (followResult) {
      await this.followRepository.delete({
        vendorId: vendorId,
        clientId: clientId,
      });
      return 'UNFOLLOWED';
    }
    await this.followRepository.create({
      clientId: clientId,
      vendorId: vendorId,
    });
    return 'FOLLOWED';
  }
}
