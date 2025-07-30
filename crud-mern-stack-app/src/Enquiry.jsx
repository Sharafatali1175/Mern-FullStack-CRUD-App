import React, { useEffect, useState } from 'react'
import { Button, Label, TextInput, Textarea } from "flowbite-react"
import { ToastContainer, toast } from 'react-toastify';
import EnquiryList from './enquiry/EnquiryList';
import axios from 'axios';

const Enquiry = () => {
    let [enquiryList,setEnquiryList]=useState([])
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        phone:"",
        message:"",
        id:''
    })

    let saveEnquiry = (e)=>{
        e.preventDefault()
        if(formData._id){
          axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`,formData)
          .then((res)=>{
            toast.success('Enquiry Update Successfully')
            setFormData({
              name:'',
              email:'',
              phone:'',
              message:'',
              _id:''
            })
            getAllenquiry()
          })
        } else {
         axios.post(`http://localhost:8020/api/website/enquiry/insert`,formData)
         .then((res)=>{
          toast.success('Enquiry Saved Successfully')
          setFormData({
            name:'',
            email:'',
            phone:'',
            message:''
          })
          getAllenquiry()
         })
        }
    }

    let getAllenquiry = () =>{
        axios.get(`http://localhost:8020/api/website/enquiry/view`)
        .then((res)=>{
           return res.data
        })
        .then((finalData)=>{
          if(finalData.status){
            setEnquiryList(finalData.enquiryList)
          }
        })
    }

    let getValue = (e) =>{
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let oldData = {...formData}
        oldData[inputName] = inputValue
        setFormData(oldData)
    }

    useEffect(()=>{
        getAllenquiry()
    },[])

  return (
    <div>
      <ToastContainer />
      <h1 className='font-bold text-center py-2 text-[30px] sm:text-[40px]'>User Enquiry</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[35%_auto] gap-4 md:gap-10 px-4">
        <div className='bg-gray-200 p-4 rounded-md'>
          <h2 className='text-[20px] font-bold mb-2'>Enquiry Form</h2>
          <form onSubmit={saveEnquiry}>
            <div className='py-2'>
              <Label htmlFor="name">Your Name</Label>
              <TextInput type="text" value={formData.name} onChange={getValue} name='name' placeholder="Enter Your Name" required />
            </div>
            <div className='py-2'>
              <Label htmlFor="email">Your Email</Label>
              <TextInput type="email" value={formData.email} onChange={getValue} name='email' placeholder="Enter Your Email" required />
            </div>
            <div className='py-2'>
              <Label htmlFor="phone">Your Phone</Label>
              <TextInput type="text" value={formData.phone} onChange={getValue} name='phone' placeholder="Enter Your Phone" required />
            </div>
            <div className='py-2'>
              <Label htmlFor="message">Your Message</Label>
              <Textarea onChange={getValue} value={formData.message} name='message' placeholder="Message..." required rows={2} />
            </div>
            <div className='py-2'>
              <Button type="submit" className='w-full bg-blue-700 p-2'>
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} setFormData={setFormData} />
      </div>
    </div>
  )
}

export default Enquiry
