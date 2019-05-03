export class Account {

  id: string;

  username: string;

  password: string;

  email: string;

  mobileLoginFlag: boolean;

  accountLocked: boolean;

  accountExpired = true;

  staffId: string;

  organizationId: string;

  wxOpenid: string;

  alipayOpenid: string;

  status = 1;

  remark: string;

  modified: string;

  expiredDate: string;

  created: string;

}
