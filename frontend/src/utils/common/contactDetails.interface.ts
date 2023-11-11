export interface IContactDetails {
  email: string;
  phone: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  country: string;
  zip_code: string;
}
