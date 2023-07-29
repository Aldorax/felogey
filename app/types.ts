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
  has_paid: string;
  referral_list: ReferredUser[];
  earnings: number | null;
  referral_code: string;
  referral_link: string;
  referred_me: string;
  total_referred_users: number;
}

export interface ReferredUser {
  is_email_verified: string;
  last_name: string;
  first_name: string;
  id: string;
  email: string;
  has_paid: string;
  profile_image: string; // Change the type to include "null"
}
