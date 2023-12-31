export type Admin = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  has_paid: boolean;
  phone_number: string;
  referral_code: string;
  referral_link: string;
  referred_by_id: number | null;
  referred_me: number; // You may need to specify the correct type for referred_me
  role_id: number;
  role: string;
  created_at: string;
  modified_at: string;
  is_email_verified: string;
  earnings: number;
  account: string;
  bank_name: string;
  profile_image: string;
  mobilizer_intern_id: number;
  total_referred_users: number;
  reserved_earnings: number;
  total_paid_referrals: number;
  total_unpaid_referrals: number;
  total_verified_referrals: number;
  total_unverified_referrals: number;
  total_amount_withdrawn: number;
  total_amount_earned: number;
  total_agents_referred: number;
  total_interns_referred: number;
};
