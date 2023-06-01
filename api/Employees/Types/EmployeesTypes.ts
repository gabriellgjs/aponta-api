import { Address, Employee, People, Telephone, User } from '@prisma/client';

export type getEmployee = Promise<
  | (Employee & {
      people: People & {
        address: Address[];
        telephone: Telephone[];
      };
    })
  | null
>;

export type getEmployees = Promise<
  {
    id: number;
    people: {
      name: string;
    };
  }[]
>;

export type responseGetEmployee =
  | (Employee & {
      people: People & {
        address: Address[];
        telephone: Telephone[];
      };
    })
  | null;

export type responseGetEmployees = {
  id: number;
  people: {
    name: string;
  };
}[];
