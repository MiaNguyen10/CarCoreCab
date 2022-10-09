export enum ETier {
  KBANK_ADMIN = 'admin',
  COMPANY_SUPERUSER = 'superUser',
  COMPANY_CHECKER = 'checker',
  COMPANY_LABELER = 'labeler',
  COMPANY_VIEWER = 'viewer'
}

export type TPermission = ETier.KBANK_ADMIN | ETier.COMPANY_SUPERUSER |
  ETier.COMPANY_CHECKER | ETier.COMPANY_LABELER | ETier.COMPANY_VIEWER

export type TPermissionContext = {
    isAllowedTo: (userTier: TPermission, permission: TPermission[]) => boolean;
  }
