export class Register {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  activationToken: string;
  tokenExpiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
