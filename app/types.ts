export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  created_at: string;
  is_email_verified: string;
  profile_image: string; // Change the type to include "null"
  modified_at: string;
  account: number;
  bank_name: string;
  has_paid: string;
  referral_list: ReferredUser[];
  earnings: number | null;
  referral_code: string;
  referral_link: string;
  referred_me: string;
  total_referred_users: number;
  total_paid_users: number;
  total_unpaid_users: number;
  total_users: number; // Total registered users
  // recent_referral_history: ReferralHistory[]; // Recent referral history
}

export interface ReferredUser {
  is_email_verified: string;
  last_name: string;
  first_name: string;
  id: string;
  email: string;
  has_paid: string;
  profile_image: string; // Change the type to include "null"
  created_at: string;
}

export interface ReferralHistory {
  created_at: string;
  referred_me: string;
  id: string;
  email: string;
  has_paid: string;
  // Add the missing properties
  date: string;
  referred: string;
  referrer: string;
}

export interface Transfer {
  account_name: string;
  account_number: string;
  bank_name: string;
}