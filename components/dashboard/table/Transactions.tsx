import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

export type UserData = {
  name: string;
  hasPaid: boolean;
};

interface TransactionsTableProps {
  data: UserData[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // Check if data is an array before calculating pagination
  const validData = Array.isArray(data) ? data : [];

  const pages = Math.ceil(validData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return validData.slice(start, end);
  }, [page, validData]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            page={page}
            total={pages}
            onChange={(page: number) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="hasPaid">HAS PAID</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.hasPaid ? "Yes" : "No"}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
