let form=document.querySelector("form");
let fname=document.querySelectorAll("input")[0];
let lname=document.querySelectorAll("input")[1];
let email=document.querySelectorAll("input")[2];
let mobile=document.querySelectorAll("input")[3];
let password=document.querySelectorAll("input")[4];
let cpassword=document.querySelectorAll("input")[5];

let efname=document.querySelectorAll("span")[0];
let elname=document.querySelectorAll("span")[1];
let eemail=document.querySelectorAll("span")[2];
let emobile=document.querySelectorAll("span")[3];
let epassword=document.querySelectorAll("span")[4];
let ecpassword=document.querySelectorAll("span")[5];
let btn=document.querySelector("button");


let storage=[];
let datafromstorage=JSON.parse(localStorage.getItem("recipeUser"));
if(datafromstorage){
  storage=datafromstorage;
}

// console.log(form,fname,lname,email,mobile,password,cpassword,efname,elname,eemail,emobile,epassword,ecpassword,btn);


form.addEventListener("submit",(e)=>{
  
  let flag=true;
  
    //first Name
    let regx=/^[a-zA-Z]{1,17}$/
    if(fname.value==""){
        efname.innerText="Enter the First Name"
        e.preventDefault();
        flag=false;
        //fname.style.border="2px solid red";
    }
    else if(regx.test(fname.value)){
         efname.innerText="";

    }else{
        efname.innerText="Invalid First Name";
        e.preventDefault();
        flag=false;
    }

    //last Name
    
    if(lname.value==""){
        elname.innerText="Enter the Last Name"
        e.preventDefault();
        flag=false;
        //lname.style.border="2px solid red";
    }
    else if(regx.test(lname.value)){
         elname.innerText="";

    }else{
        elname.innerText="Invalid Last Name";
        e.preventDefault();
        flag=false;
    }
    //EMAIL
    let emailCheck=storage.find((e)=>{
      if(e.email==email.value){
        return e;
      }
    })

    if(emailCheck){
      eemail.innerText="Email Already Exists"
      e.preventDefault();
      flag=false;
    }
    else if(email.value==""){
        eemail.innerText="Enter the Email"
        e.preventDefault();
        flag=false;
        
    }
    else{
         eemail.innerText="";
    }

    //mobile validation
    let mobileCheck=storage.find((e)=>{
      if(e.phone==mobile.value){
        return e;
      }
    })
    let regxmb=/^[6-9][0-9]{9}$/
    if(mobileCheck){
      emobile.innerText=" Mobile Number Already Exits";
       e.preventDefault();
        flag=false;
    }
    else if(mobile.value==""){
        emobile.innerText="Enter the Mobile Number"
        e.preventDefault();
        flag=false;
    }
    else if(regxmb.test(mobile.value)){
      emobile.innerText="";

      
    }
    else{
      emobile.innerText="Invalid Mobile Number";
      e.preventDefault();
      flag=false;
        
    }

    //password validation
    let regxp=/^[a-zA-Z0-9@]{8,10}$/
    if(password.value==""){
        epassword.innerText="Enter the Password"
        e.preventDefault();
        flag=false;
        
    }
    else if(regxp.test(password.value)){
      epassword.innerText="";      
    }
    else{
      epassword.innerText="Invalid password";
      e.preventDefault();
      flag=false;
        
    }
    //CONFIRM PASSWORD
    if(cpassword.value==""){
        ecpassword.innerText="Enter the Password"
        e.preventDefault();
        flag=false;
        
    }
    else if(password.value==cpassword.value){
      ecpassword.innerText="";      
    }
    else{
      ecpassword.innerText="Password is not Matching";
      e.preventDefault();
      flag=false;
        
    }


    //local storage
    if(flag){
      let details={
        first:fname.value,
        last:lname.value,
        email:email.value,
        phone:mobile.value,
        password:password.value,
      
      }
      storage.push(details)
      localStorage.setItem("recipeUser",JSON.stringify(storage))
    }
   

})




