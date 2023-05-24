export interface IEmployee {
  name: string;
  age: number;
  email: string;
  address?: string;
  password: string;

  createdAt?: Date;
  updatedAt?: Date;
}
