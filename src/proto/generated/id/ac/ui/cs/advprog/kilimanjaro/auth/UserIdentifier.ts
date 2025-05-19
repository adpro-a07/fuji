// Original file: public/assets/proto/auth.proto


export interface UserIdentifier {
  'userId'?: (string);
  'email'?: (string);
  'identifier'?: "userId"|"email";
}

export interface UserIdentifier__Output {
  'userId'?: (string);
  'email'?: (string);
  'identifier'?: "userId"|"email";
}
