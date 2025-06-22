import { CircleChevronDown } from "lucide-react";
import { CircleChevronUp } from 'lucide-react';

import React from "react";
import { CircleUser, Eye, Trash } from "lucide-react";

import { SquarePen } from "lucide-react";
import DialogDemo from "@/components/DialogDemo";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DropComponent({
  datatitle,
  data,
  setvaluefunc,
  // handleAdd,
  handledelete,
  title,
  children,
}) {
  const [up, setup] = useState(false);

 

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className=" font-semibold">
          {title}

         {/* <button > */}
          {
            up ? (
            <CircleChevronDown  size={22} onClick={() => setup(false)} className="cursor-pointer" /> )
            :(
                  <CircleChevronUp size={22} onClick={() => setup(true)} className="cursor-pointer" /> )

          }
         {/* </button> */}


         
        </div>
       
          {children}
      
      </div>

      {!up && (
        <div>
          <Table className="border-1 border-gray-200">
            <TableCaption>
              {/* <Pagination>
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
            </Pagination> */}
            </TableCaption>
            <TableHeader className="border-1 border-gray-200 bg-gray-100">
              <TableRow>
                <TableHead className="w-[100px]">#ID</TableHead>
                {datatitle.map((title, index) => (
                  <TableHead key={index} className="w-[100px]">
                    {title}
                  </TableHead>
                ))}

                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((sub, index) => (
                <TableRow className="border-0.5 border-gray-200" key={sub.id}>
                  <TableCell
                    key={sub.id}
                    className="font-medium flex items-center gap-2"
                  >
                    #{index + 1}
                  </TableCell>

                  {datatitle.map((title, idx) => (
                    <TableCell key={idx} className="font-medium">
                      {sub[title] || "N/A"}
                    </TableCell>
                  ))}

                  <TableCell key={sub.id} className=" flex items-center gap-2">
                    <Eye className="cursor-pointer" />

                    <button
                      onClick={() => {
                        //handleedit
                        //   setValue("startDate", sub.startDate);
                        //   setValue("amount", sub.amount);
                        //   const matchedMember = members.find(
                        //     (member) => member.fullName === sub.memberName
                        //   );
                        //   setValue(
                        //     "membersID",
                        //     String(matchedMember.id.toString())
                        //   );
                        //   setValue("ActivityName", sub.activitiesName);
                        //   setValue("id", sub.id);
                        //   setActivityOffer(sub.activitiesName);
                        //   setisedit(true);
                        //   // const matchoffers = offers.find(
                        //   //   (offer) => offer.name === sub.offerName
                        //   // );
                        //   // setValue("offersID", String(matchoffers?.id.toString()));
                        //   ref.current.click();
                        setvaluefunc(sub);
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
      )}
    </div>
  );
}

export default DropComponent;
