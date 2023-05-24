export interface IEmployeeEditableAttributes {
  name?: string;
  age?: number;
  email?: string;
  address?: string;
  password?: string;
  isVerified?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
