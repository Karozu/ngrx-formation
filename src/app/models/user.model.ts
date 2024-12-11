export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: {
    zip: string;
    country: string;
    city: string;
    street: string;
  };
}
