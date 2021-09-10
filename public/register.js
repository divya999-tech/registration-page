window.onload=function(){
 let form=document.getElementById("myform")


form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let email=document.getElementById("email")
let password=document.getElementById("password")
let passwordConfirmation=document.getElementById("passwordrepeat")
let checkbox=document.getElementById("checkbox")
let successMsg=document.getElementById("success")
let errorMsg=document.getElementById("error")
if(email.value=="" || password.value=="" || passwordConfirmation.value==""){
    errorMsg.innerHTML="All fields are required"
    errorMsg.style.color="red";
//alert("All fields are required")
}else if(email.value.length>30){
    
     errorMsg.textContent="Must be length of 30 characters"
     errorMsg.style.color="red";
    //alert("Must be length of 30 characters")
}else if(password.value!=passwordConfirmation.value){
     errorMsg.textContent="Password not matching"
     errorMsg.style.color="red";
   // alert("Password not matching")
}

else{
    const data={
        email:email.value ,
      password:password.value,
      passwordConfirmation:passwordConfirmation.value ,
      
      
      };
      
      let options={
        method:'POST',
       headers: { "Content-type": "application/json; charset=UTF-8"  },
        body:JSON.stringify(data)
      };
      const response = await fetch('/', options);
      const id= await response.json();
   //console.log(id);
   if(response.status==200){
     successMsg.textContent="Thank you for signing up to the account"
     successMsg.style.color="green";
    //alert("Success")
    
    
   }else{
     errorMsg.textContent="User already Exists. Please check."
     errorMsg.style.color="red";
   // alert("User already Exists. Please check.")
   }
    }  
})   
}
