import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import axios from 'axios';
import { toast } from 'react-toastify';

const EnquiryList = ({ data, getAllenquiry, setFormData }) => {

  let deleteRow = (delid) => {
    axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
      .then((res) => {
        toast.success('Enquiry Deleted Successfully')
        getAllenquiry()
      })
  }

  let editRow = (editid) => {
    axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.enquiry)
      })
  }

  return (
    <div className="bg-gray-200 p-4 w-full">
      <h2 className='font-bold py-2 text-[20px] mb-4 text-center md:text-left'> Enquiry List </h2>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr No</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {
              data && data.length >= 1 ?
                data.map((item, index) => (
                  <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => deleteRow(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
                      >
                        Delete
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => editRow(item._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell colSpan={7} className="text-center">
                    No Data Found
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EnquiryList
