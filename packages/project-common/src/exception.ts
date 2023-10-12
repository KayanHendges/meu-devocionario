export class APIException {
  readonly path: string;
  readonly time: string;
  readonly statusCode: number;
  readonly message: string;
}
