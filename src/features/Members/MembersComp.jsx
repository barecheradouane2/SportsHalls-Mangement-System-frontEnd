import Input from "@/components/Input";
import Refreshbtn from "@/components/Refreshbtn";
import Searchbtn from "@/components/Searchbtn";
import Funnelbtn from "@/components/Funnelbtn";
import SearchComp from "@/components/SearchComp";
import { User } from "lucide-react";
import EditMemberDialog from "@/features/Members/EditMemberDialog";
// import { useEffect, useState } from "react";

import { Eye } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Trash } from "lucide-react";
import { CircleUser } from "lucide-react";
// import { useForm } from "react-hook-form";
import DialogDemo from "@/components/DialogDemo";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// import { useEffect } from "react";

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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";

function MembersComp({
  Members,
  handledelete,
  handleUpdate,
  setPageNumber,
  pageNumber,
  setSearch
}) {
 

  const MemberIDRef = useRef(null);
const FullNameRef = useRef(null);

const [filterOpen, setFilterOpen] = useState(false);

  // const {

  //   register,

  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => {
  //   handleUpdate(data.id, {
  //     fullName: data.fullName,
  //     phoneNumber: data.phoneNumber,
  //     status: data.status,
  //   });

  // };

  return (
    <div className=" flex flex-col gap-2">
      <SearchComp>
        <div className="flex items-center gap-2 flex-1">
          <Input
            title="Member ID"
            placeholder="ex 12345"
            type="text"
            ref={MemberIDRef}
            onChange={(e) => console.log(e.target.value)}
            disable={filterOpen}
            // value=""
          />

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
          <Refreshbtn  onClick={()=>{
            setSearch("");
            MemberIDRef.current.value = "";
            FullNameRef.current.value = "";
            setPageNumber(1);

          }}/>

          <Searchbtn onClick={()=>{
             
            //  if(MemberIDRef.current.value!=""){
            //    setSearch(MemberIDRef.current.value);
            //  }else{
            //         setSearch(FullNameRef.current.value)
            //  }

           setSearch(FullNameRef.current.value+" "+ MemberIDRef.current.value)
          
          }} 
            
            />

          <Funnelbtn  filterOpen={filterOpen} setFilterOpen={setFilterOpen}/>
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
                    setPageNumber(prev => Number(prev) - 1);
                   
                  }}
                >
                <PaginationPrevious  />
                </button>
              </PaginationItem>
              <PaginationItem>
                
                <PaginationLink >{pageNumber}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <button
                  onClick={() => {
                    setPageNumber(prev => Number(prev) + 1);
                   
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
            <TableHead className="w-[100px]">Members ID</TableHead>
            <TableHead>fullName</TableHead>
            <TableHead>statusName</TableHead>
            <TableHead className="">phoneNumber</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Members.map((member) => (
            <TableRow className="border-0.5 border-gray-200" key={member.id}>
              <TableCell
                key={member.id}
                className="font-medium flex items-center gap-2"
              >
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {" "}
                    <CircleUser />
                  </AvatarFallback>
                </Avatar>

                {member.id}
              </TableCell>
              <TableCell key={member.id} className="font-medium">
                {member.fullName}
              </TableCell>
              <TableCell key={member.id} className="font-medium">
                {member.statusName}
              </TableCell>
              <TableCell key={member.id} className="font-medium">
                {member.phoneNumber}
              </TableCell>

              <TableCell key={member.id} className=" flex items-center gap-2">
                <Eye className="cursor-pointer" />

                <EditMemberDialog member={member} handleUpdate={handleUpdate} />

                <DialogDemo
                  btnName={<Trash className="cursor-pointer" />}
                  description="Are you sure you want to delete"
                  btnIcon=""
                  title="Delete   member"
                  handleSubmit={() => handledelete(member.id)}
                ></DialogDemo>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MembersComp;
