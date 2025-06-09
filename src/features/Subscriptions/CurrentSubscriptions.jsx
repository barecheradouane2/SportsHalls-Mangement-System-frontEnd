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

import EditSubscriptionDialog from "./EditSubscriptionDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function CurrentSubscriptions({
  data,
  setSearch,
  activitesdata,
  handledelete,
  // handleUpdate,
  setPageNumber,
  pageNumber,
  setActivityOffer,
  // activites,
  // offers,
  // activityoffer,
  members,
  ref,
  setValue,
  setisedit
}) {
  const activityRef = useRef(null);
  const FullNameRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className=" flex flex-col gap-2">
      <SearchComp>
        <div className="flex items-center gap-2 flex-1">
          <select
            className="border p-2 rounded w-full"
            onChange={(e) => console.log(e.target.value)}
            ref={activityRef}
            disabled={filterOpen}
          >
            {activitesdata.map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>

          <Input
            title="FullName"
            placeholder="ex: Bareche Radouane"
            type="text"
            ref={FullNameRef}
            disable={filterOpen}
            onChange={(e) => console.log(e.target.value)}
            // value=""
          />
        </div>

        <div className="flex items-center gap-2">
          <Refreshbtn
            onClick={() => {
              setSearch("");
              activityRef.current.value = "";
              FullNameRef.current.value = "";
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
                FullNameRef.current.value + " " + activityRef.current.value
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
            <TableHead className="w-[100px]">Subscription ID</TableHead>
            <TableHead>Member Name</TableHead>
            <TableHead>status</TableHead>
            <TableHead>status paid</TableHead>
            <TableHead>Activity </TableHead>
            <TableHead className="">Start Date</TableHead>
            <TableHead className="">End Date</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((sub,index) => (
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

                {index+1}
              </TableCell>
              <TableCell key={sub.id} className="font-medium">
                {sub.memberName}
              </TableCell>
              <TableCell key={sub.id} className="font-medium">
                {sub.status}
              </TableCell>

              <TableCell key={sub.id} className="font-medium">
                <span>
                  
                  {
                    sub.reaminnigAmount == 0 ? (
                      <span className="text-green-500">{sub.reaminnigAmount}</span>
                    ) :  (
                      <span className="bg-red-700 text-white  px-1  py-1 
                      ">{sub.reaminnigAmount}</span>
                    ) 
                  }
                  </span> 
              </TableCell>

              <TableCell key={sub.id} className="font-medium">
                {sub.activitiesName}
              </TableCell>

              <TableCell key={sub.id} className="font-medium">
                {sub.startDate}
              </TableCell>

              <TableCell key={sub.id} className="font-medium">
                {sub.endDate}
              </TableCell>

              <TableCell key={sub.id} className=" flex items-center gap-2">
                <Eye className="cursor-pointer" />

                <button
                  onClick={() => {
                    setValue("startDate", sub.startDate);
                    setValue("amount", sub.amount);
                   

                    const matchedMember = members.find(
                      (member) => member.fullName === sub.memberName
                    );

                 
                    setValue("membersID", String(matchedMember.id.toString()));

                   
                     setValue("ActivityName", sub.activitiesName);

                     setValue("id",sub.id);

                      setActivityOffer(sub.activitiesName)

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
                  title="Delete   member"
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

export default CurrentSubscriptions;
