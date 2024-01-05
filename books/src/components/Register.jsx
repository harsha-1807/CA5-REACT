import React, { useState } from 'react'
import "./Register.css"
import { Link } from 'react-router-dom'

import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Form = () => {
    // const [submitted,setSubmitted] = useState(false);
    
    
    // useform 
    const {register,handleSubmit,watch,reset,formState:{errors,isSubmitSuccessful,isSubmitted}} = useForm()
    
    // for showPassword checkbox 
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleInputChange = (event) => {
        setPassword(event.target.value);
    };
    
    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };
    

    const showToastMessage = () => {
        
        toast.success("signed up!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      };

    // for SubmitEvent 
    let submitted = false
    if (isSubmitSuccessful == true){
        submitted = true
        showToastMessage()
    }


    localStorage.setItem("submitstatus",submitted)
    console.log("errors:",errors);

    const FormSubmitHandler = (data) =>{
        // data.preventDefault();
        console.log("data:",data);
    }

    
    

    return (
        
    <div className='container'>
        {isSubmitSuccessful && <div className='success'>
            <div className='success2'>

                <h2 style={{margin:"20px"}}>Registration Successfull ✅</h2>
                
            </div>
            {/* <Link to={"/"}>
            <button style={{backgroundColor:"green"}}>Back to Home</button> 
            </Link> */}

            </div>}
        <fieldset style={{ display: isSubmitSuccessful==true ? 'none' : 'block' ,padding:"10px",overflowY:"hidden"}}>
            <legend>Fill this form</legend>
            <form onSubmit={handleSubmit(FormSubmitHandler) }>
            {/* <form onSubmit={handleSubmit((data) => { FormSubmitHandler(data); showToastMessage(); })}> */}
          
            <label>Name:</label>
            <input type="text" name="name" {...register("name",{required : "Fill name",minLength:{
                value:3,
                message:"minimum 3 characters required"
            },maxLength:{
                value:30,
                message:"maximum 30 characters only required"
            }})}/>
            {/* {errors.firstName && <p className='err'>{errors.firstName.message}</p>} */}
            <p className='err'>{errors.name ?.message}</p>

            

            <label>Email:</label>
            <input type="text" name='email' {...register("email",{required : "Fill email",minLength:{
                value:4,
                message:"minimum 4 characters required"
            },pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message:"Email not valid"}})}/>
            <p className='err'>{errors.email ?.message}</p>

            <label>Password:</label>
            <input type={showPassword ? "text" : "password"}
        
          onChange={handleInputChange} name='password' {...register("password",{required : "Fill password",minLength:{
                value:4,
                message:"minimum 4 characters required"
            },maxLength:{
                value:8,
                message:"maximum 8 characters only allowed"
            },pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
            message:"password not valid"}})}/>
            <p className='err'>{errors.password ?.message}</p>

            <label>Repeat Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            
            onChange={handleInputChange}
            name="repeatPassword"
            {...register('repeatPassword', {
              required: 'password mismatching',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
          <p className="err">{errors.repeatPassword?.message}</p>
          <div style={{display:"flex",textAlign:"center"}}>


          <input type="checkbox" checked={showPassword}
          onChange={handleShowPasswordToggle} style={{height:"20px",marginLeft:"110px"}} /> <h4>Show password</h4>
          </div>

            <input type='submit'  value={"Sign Up"} style={{margin:"10px"}} />
            {/* <button className="reset"  onClick={()=>{reset()}}>reset</button> */}
        

            </form>
        </fieldset>
        <Link to={"/"} style={{margin:"10px"}}>
            <button style={{backgroundColor:"green",color:"white"}}>Back to Home</button> 
            </Link>

            <ToastContainer/>
    </div>
  )
}

export default Form;