export interface IEmployee {
  name: string;
  age: number;
  email: string;
  address?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
