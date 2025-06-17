import React from "react";
import { useState, useRef } from "react";
import { CircleUser, Eye, Trash } from "lucide-react";

import SearchComp from "@/components/SearchComp";
import Input from "@/components/Input";

import Refreshbtn from "@/components/Refreshbtn";
import Searchbtn from "@/components/Searchbtn";
import Funnelbtn from "@/components/Funnelbtn";
import EditMemberDialog from "../Members/EditMemberDialog";
import DialogDemo from "@/components/DialogDemo";

import { SquarePen } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Label } from "@/components/ui/label";

// import EditSubscriptionDialog from "./EditSubscriptionDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function OutcomesComp({
  data,
  setSearch,
  // activitesdata,
  handledelete,
  // handleUpdate,
  setPageNumber,
  pageNumber,

  //  activites,
  // offers,
  // activityoffer,
  //  members,
  ref,
  setValue,
  setisedit,
}) {
  // const FullNameRef = useRef(null);
  const expenseTypeRef = useRef(null);
  const expensedateRef = useRef(null);

  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className=" flex flex-col gap-2">
      <SearchComp>
        <div className="flex items-center gap-2 flex-1">
          <Input
            title="Expense Date"
            placeholder="Expense date"
            id="expensedate"
            name="expensedate"
            type="date"
            ref={expensedateRef}
            defaultValue={new Date().toISOString().split("T")[0]} // Set default to today
          />

          <select
            id="expenseType"
            ref={expenseTypeRef}
            className="border p-2 rounded w-full"
          >
            <option value="">  Type</option>
            <option key={2} value={2}>
              {"yearly"}
            </option>

            <option key={1} value={1}>
              {"monthly"}
            </option>

            <option key={0} value={0}>
              {"ontime"}
            </option>
          </select>

          {/* <Input
            title="FullName"
            placeholder="ex: Bareche Radouane"
            type="text"
            ref={FullNameRef}
            disable={filterOpen}

            // value=""
          /> */}
        </div>

        <div className="flex items-center gap-2">
          <Refreshbtn
            onClick={() => {
              setSearch("");
              // activityRef.current.value = "";
              // FullNameRef.current.value = "";
              expenseTypeRef.current.value = "";
              expensedateRef.current.value = new Date()
                .toISOString()
                .split("T")[0]; // Reset to today's date
              setPageNumber(1);
            }}
          />

          <Searchbtn
            onClick={() => {
              //  if(MemberIDRef.current.value!=""){
              //    setSearch(MemberIDRef.current.value);
              //  }else{
              //         setSearch(FullNameRef.current.value)
              //  }

              setSearch(
                // FullNameRef.current.value +
                //   " " +
                //   // activityRef.current.value +
                //   " " +
                  expenseTypeRef.current.value +
                  " " +
                  expensedateRef.current.value
              );
            }}
          />

          <Funnelbtn filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
        </div>
      </SearchComp>

      <Table className="border-1 border-gray-200">
        <TableCaption>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <button
                  onClick={() => {
                    if (pageNumber <= 1) return;
                    setPageNumber((prev) => Number(prev) - 1);
                  }}
                >
                  <PaginationPrevious />
                </button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{pageNumber}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <button
                  onClick={() => {
                    setPageNumber((prev) => Number(prev) + 1);
                  }}
                >
                  <PaginationNext />
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TableCaption>
        <TableHeader className="border-1 border-gray-200 bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]"> ID</TableHead>
            <TableHead> Name</TableHead>
            <TableHead>totalPrice </TableHead>
            <TableHead> Date</TableHead>
             <TableHead> note</TableHead>
              <TableHead> typeName</TableHead>

            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((sub, index) => (
            <TableRow className="border-0.5 border-gray-200" key={sub.id}>
              <TableCell
                key={sub.id}
                className="font-medium flex items-center gap-2"
              >
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {" "}
                    <CircleUser />
                  </AvatarFallback>
                </Avatar>

                {index + 1}
              </TableCell>
              <TableCell key={sub.id} className="font-medium">
                {sub.name}
              </TableCell>

              <TableCell key={sub.id} className="font-medium">
                {sub.totalPrice}
              </TableCell>

              <TableCell key={sub.id} className="font-medium">
                {sub.date}
              </TableCell>

                <TableCell key={sub.id} className="font-medium">
                {sub.note}
              </TableCell>

                <TableCell key={sub.id} className="font-medium">
                {sub.typeName}
              </TableCell>

              <TableCell key={sub.id} className=" flex items-center gap-2">
                <Eye className="cursor-pointer" />

                <button
                  onClick={() => {
                    setValue("date", sub.Date);
                    setValue("totalPrice", sub.totalPrice);
                    setValue("name", sub.name);

                    setValue("note", sub.note);
                    setValue("type", sub.type);


                    setValue("id", sub.id);

                    setisedit(true);

                    // const matchoffers = offers.find(
                    //   (offer) => offer.name === sub.offerName
                    // );

                    // setValue("offersID", String(matchoffers?.id.toString()));

                    ref.current.click();
                  }}
                >
                  <SquarePen className="cursor-pointer" />
                </button>

                <DialogDemo
                  btnName={<Trash className="cursor-pointer" />}
                  description="Are you sure you want to delete"
                  btnIcon=""
                  title="Delete outcome"
                  handleSubmit={() => handledelete(sub.id)}
                ></DialogDemo>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OutcomesComp;
