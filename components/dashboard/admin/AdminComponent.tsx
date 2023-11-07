import React from "react";
import { Admin } from "@/types/Admin";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import TableButton from "../table/tableButton";
import PaymentButton from "../payment/paymentButton";
import ReferralTable from "../referral/referralData";

interface AdminComponentProps {
  admin: Admin;
}

const AdminComponent: React.FC<AdminComponentProps> = ({ admin }) => {
  return (
    <div className="max-w-screen">
      <Card className="w-[90vw] p-4">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Wallet Details</p>
            <p className="text-small text-default-500 font-semibold">
              Enetworksagencybanking.com.ng
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-between">
          <div>Balance</div>
          <div>&#x20A6;{admin?.earnings}</div>
        </CardFooter>
      </Card>
      <br />
      <Card className="w-[90vw] p-4">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Statistics</p>
            <p className="text-small text-default-500 font-semibold">
              Your stats
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="flex flex-col">
          <div className="flex justify-between w-full mt-2 mb-2">
            <div>All time Earnings</div>
            <div>&#x20A6;{admin?.total_amount_earned}</div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-2 mb-2">
            <div>Total No of interns Referred</div>
            <div>{admin?.total_referred_users}</div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-2 mb-2">
            <div>Total Paid referrals</div>
            <div>{admin?.total_paid_referrals}</div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-2 mb-2">
            <div>Total unpaid referrals</div>
            <div>{admin?.total_unpaid_referrals}</div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-2 mb-2">
            <div>Total verified referrals</div>
            <div>{admin?.total_verified_referrals}</div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-2 mb-2">
            <div>Total unverified referrals</div>
            <div>{admin?.total_unverified_referrals}</div>
          </div>
        </CardFooter>
      </Card>
      <br />
      <Card className="w-[90vw] p-4">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-small text-default-500 font-semibold">
              Withdraw to your bank account
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter>
          <PaymentButton />
        </CardFooter>
      </Card>
      <br />
      <Card className="w-[90vw] p-4 ">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-small text-default-500 font-semibold">
              Referral details
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter>
          <ReferralTable
            code={admin?.referral_code}
            link={admin?.referral_link}
          />
        </CardFooter>
      </Card>
      <br />
      <Card className="w-[90vw] p-4 ">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-small text-default-500 font-semibold">
              Referrals
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter>
          <TableButton />
        </CardFooter>
      </Card>
      <br />
    </div>
  );
};

export default AdminComponent;
