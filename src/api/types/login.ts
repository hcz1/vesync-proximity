export interface LoginReponse {
  traceId: string;
  code: number;
  msg: string;
  result: LoginResult;
}

export interface LoginResult {
  isRequiredVerify: boolean;
  accountID: string;
  avatarIcon: string;
  birthday: string;
  gender: string;
  acceptLanguage: string;
  userType: string;
  nickName: string;
  mailConfirmation: boolean;
  termsStatus: boolean;
  gdprStatus: boolean;
  countryCode: string;
  registerAppVersion: string;
  registerTime: string;
  verifyEmail: string;
  heightCm: number;
  weightTargetSt: number;
  heightUnit: string;
  heightFt: number;
  weightTargetKg: number;
  weightTargetLb: number;
  weightUnit: string;
  targetBfr: number;
  displayFlag: any[];
  real_weight_kg: number;
  real_weight_lb: number;
  real_weight_unit: string;
  heart_rate_zones: number;
  run_step_long_cm: number;
  walk_step_long_cm: number;
  step_target: number;
  sleep_target_mins: number;
  token: string;
}
