export interface User {
  email: string;
  interns_data: Intern[];
  mobilizers_data: Mobilizer[];
  executives_data: Executive[];
  name: string;
  referrals: Referral[];
  role: string;
  total_executives: number;
  total_interns: number;
  total_mobilizers: number;
  total_referrals: number;
  profile_image: string;
  total_users: number;
  phone_number: string;
}

export interface Intern {
  address: string;
  email: string;
  has_paid: boolean;
  name: string;
  phone_number: string;
  state: string;
}

export interface Mobilizer {
  address: string;
  email: string;
  has_paid: boolean;
  name: string;
  phone_number: string;
  state: string;
}

export interface Referral {
  referred_name: string;
  referrer_name: string;
}

export interface Executive {
  address: string;
  email: string;
  has_paid: boolean;
  name: string;
  phone_number: string;
  state: string;
}
