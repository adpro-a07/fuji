// Original file: public/assets/proto/auth.proto

import type { Long } from '@grpc/proto-loader';

export interface UserProfile {
  'address'?: (string);
  'workExperience'?: (string);
  'totalJobsDone'?: (number);
  'totalIncome'?: (number | string | Long);
}

export interface UserProfile__Output {
  'address': (string);
  'workExperience': (string);
  'totalJobsDone': (number);
  'totalIncome': (string);
}
