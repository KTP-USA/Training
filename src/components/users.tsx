

import { use, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { TailSpin } from "react-loader-spinner";
import { Edit } from "lucide-react";


const Users = () =>{
  const [hasCreated, sethasCreated] = useState(false)
const [hasSaved, setHasSaved] = useState(false);
  const testTypes = ['Competency Test', 'Technical Evaluation', 'Performance review']
 
  async function saveEdits() {
    await supabase.from('users').update(editData[0]).eq('id', editData[0]['id']);
   setHasSaved(true)
     setTimeout(() => {
        setHasSaved(false)
    }, 5000)
    let list: any = userData.map((e) => { return e==userData.find((em)=> em['id'] ==editData[0]['id']) ? editData[0] :
 e})
   setUserData(list)
  }
  const [selectedUser, setSelectUser] = useState('Username')
  const [createData, setCreateData] = useState({'machine':null, 'username':null, 'hiredate':null, 'module': null,
  'supervisor':null, 'actualstep':null, 'nextdate':null, 'role': 'USER', 'active':'Y', 'trainer':null
 })
    const [isLoading, setisLoading]=useState(true);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isCreateOpen, setCreateOpen] = useState(false)
    const [selectedSupervisor, setSupervisor] = useState('Supervisor')
    const [supervisors, setSupList] = useState([])
    const [uniqueUsers, setUniqueUsers] = useState([]);
    function getDates(date: string){
    if (date == '' || date == null){
      return '';
    } else {
let date2 = new Date(date)
    return date2.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'numeric',
        });
      }
   
  }
    const [supervisorList, setSupervisorList] = useState([]);
    const [stepList, setStepList]= useState([]);
    const [moduleList, setModuleList] =useState([]);
    const [trainerList, setTrainerList] =useState([]);
    const [password, setPassword] = useState('kurzusa1234');
    const [email, setEmail] = useState('');
    const [editData, setEditData] = useState([]);
    const [hasSupervisor, setSupervisora] = useState(true);
    const [testType, setTestType] = useState('Test Type')
    useEffect(() => {
async function loadData(){


   let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('users').select().eq('uid', session.data.session?.user.id);
    if ( userData1.data[0]['role'] != 'SUPERVISOR'){
setSupervisora(false);
    }
let loadedData: any = userData1.data[0]['role'] == 'SUPERVISOR' ? await supabase.from('users').select().eq('supervisor', userData1.data[0]['username'])


    : await supabase.from('users').select()
   
    loadedData = loadedData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username']))
 


   
    let supervisors: any = [];
    for (const entry of loadedData){
      if (!supervisors.includes(entry['supervisor'])){
supervisors.push(entry['supervisor']);
      }
     
   
   
}
let sups =await supabase.from('supervisor').select();
let hi: any = sups.data
setSupervisorList(hi);
let mods =await supabase.from('module').select();
 
let mods2: any = mods.data
setModuleList(mods2);
let step =await supabase.from('step').select();
let step2: any = step.data
let train =await supabase.from('trainer').select();


let train2: any = train.data
setTrainerList(train2);
setStepList(step2);
    setUserData(loadedData);
    setSupList(supervisors);
    setUniqueUsers(loadedData.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])).map((e:any) => e['username']))
    setisLoading(false);
}
loadData();
    }, [])
    async function deacUser(isDeactivating: boolean){
      let now = new Date();
 await supabase.from('users').update({


'active': isDeactivating ? 'N' : 'Y',
  'deactive': isDeactivating ? now.toLocaleDateString( 'en-US', {
    'day':'2-digit',
    'month':'2-digit',
    'year':'numeric'
  }) : null
}).eq('id', editData[0]['id'])
let usesdate: any =userData;
usesdate[userData.indexOf(editData[0])]['active'] = isDeactivating ?'N' : 'Y';
setUserData(usesdate);
let list: any = [usesdate[userData.indexOf(editData[0])]]
setEditData(list)
}
    const [userData, setUserData] = useState([]);
    let columns = ['Username', 'Hire Date', 'Module', 'Machine', 'Supervisor', 'Step', 'Next Date',
    'Role', 'Trainer'
    ]
      let columns2 = ['Username', 'Hire Date', 'Module', 'Machine', 'Supervisor', 'Trainer', 'Step', 'Next Date',
    'Role', 'Email', 'Password'
    ]
    async function createUser(){
     
      if (createData['username'] != null) {
const response = await supabase.functions.invoke('add-user', {body: {createData, email, password}});
if (response.error == null){
sethasCreated(true);
  setTimeout(() => {
        sethasCreated(false)
    }, 5000)
}
 let newa: any = [...userData, {'id':null, 'active':'Y', 'username':createData['username'], 'hiredate':createData['hiredate'], 'module':createData['module'], 'machine':createData['machine'],
  'supervisor':createData['supervisor'],
  'trainer':createData['trainer'],
  'actualstep':createData['actualstep'], 'nextdate':createData['nextdate'], 'uid':null, 'role':createData['role'] ??'USER', 'created_at':null,
  }];
setUserData(newa)
      }


    }
return (
<section className="flex justify-center items-center flex-col my-15 mx-10">
    {
   isEditOpen &&
      <div onClick={() => {
  setEditOpen(false); setHasSaved(false)
      }} className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute bg-black opacity-30 inset-0"></div>
<div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-xl z-10 overflow-y-auto font-poppins font-bold text-blue-400 text-2xl max-h-100 min-w-1/3" >
  <div className="flex flex-row gap-5 items-center ">
 <p> Update User </p>
  <button
onClick={() => {
deacUser(editData[0]['active'] == 'Y')
}}
className={`


flex flex-row rounded-2xl  ${editData[0]['active'] == 'Y' ? 'bg-red-500 hover:bg-red-600' :'bg-green-500 hover:bg-green-600' }
 hover:scale-102 transition-all duration-300 cursor-pointer
p-3 w-35  self-end font-normal text-lg items-center justify-center   py-2
text-white gap-2 font-poppins`}>
  {editData[0]['active'] == 'Y' ? 'Deactivate' : 'Reactivate'}
{/* {hasSaved ? 'Saved' : 'Save'} */}
</button>


  </div>
<div className="flex flex-col gap-4 mt-6">
{
    columns.map((e) => {
        return <div className="flex flex-col">
<label className="font-poppins text-lg text-gray-900 font-normal">{e}</label>
{
  e=='Role' ?
  <select
value={editData[0]['role']}
onChange={(o) => {
    let eVal: any = 'role';
  let newer: any = Object.keys(editData[0]).map((item: any) => {
 
   return item == eVal ? {[item]:o.target.value}: {[item]:editData[0][item]}})


  let list: any = [Object.assign({}, ...newer)]
 
  setEditData(list)


}} className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        ">
           <option>SUPERVISOR</option>
  <option>USER</option>
         
           <option>ADMIN</option>
        </select>
  :  
  e == 'Supervisor' || e=='Step' || e=='Module' || e=='Trainer' ?


 <select
 value={editData[0][`${ e == 'Step' ? 'actualstep'
  : e.toLocaleLowerCase()}`]}
  onChange={ (o) => {
      let eVal: any =  e == 'Supervisor' ? 'supervisor' : e=='Step' ? 'actualstep' :  e=='Module' ? 'module' :  'trainer'
  let newer: any = Object.keys(editData[0]).map((item: any) => {
 
   return item == eVal ? {[item]:o.target.value}: {[item]:editData[0][item]}})


  let list: any = [Object.assign({}, ...newer)]
 
  setEditData(list)
  }
  }
 className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        ">
      <option>Select a { e == 'Supervisor' ? 'supervisor' : e == 'Step' ? 'step' : e=='Trainer' ? 'trainer':
        'module'}... </option>
 
  {
  e == 'Step' ?stepList.map((e) => <option>{e['stepname']}</option>) : e=='Module' ? moduleList.map((e) => <option>{e['modulename']}</option>) : e=='Trainer'?
   trainerList.map((e) => <option>{e['trainername']}</option>)
  :


  supervisorList.map((e) => <option>{e['supername']}</option>)}
        </select> :
  e == 'Email' || e == 'Password' ?
   <input
   
value={e=='Email' ? email : password}
onChange={(o) => {
 e=='Email' ? setEmail(o.target.value) : setPassword(o.target.value)


}}
placeholder={e} className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        "></input> :
        e == 'Hire Date' || e=='Next Date' ?
         <input


value={editData[0][`${e == 'Hire Date' ? 'hiredate' : 'nextdate' }`]}
type="date"
onChange={(o) => {
    let eVal: any =  e == 'Hire Date' ? 'hiredate':'nextdate'
   
  let newer: any = Object.keys(editData[0]).map((item: any) => {
 
   return item == eVal ? {[item]:o.target.value}: {[item]:editData[0][item]}})


  let list: any = [Object.assign({}, ...newer)]
  setEditData(list)


}}
placeholder={e} className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        "></input>:
  <input


value={editData[0][`${e == 'Hire Date' ? 'hiredate': e == 'Step' ? 'actualstep' : e=='Next Date' ? 'nextdate'
  : e.toLocaleLowerCase()}`]}
onChange={(o) => {
    let eVal: any =  e == 'Hire Date' ? 'hiredate': e == 'Step' ? 'actualstep' : e=='Next Date' ? 'nextdate'
  : e.toLocaleLowerCase()
  let newer: any = Object.keys(editData[0]).map((item: any) => {
 
   return item == eVal ? {[item]:o.target.value}: {[item]:editData[0][item]}})


  let list: any = [Object.assign({}, ...newer)]
 
  setEditData(list)


}}
placeholder={e} className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        "></input>}
        </div>
    })
}</div>
<button
onClick={() => {
  saveEdits();
}}
className={` ${hasSaved ?
  'bg-green-500 ' : "bg-blue-500 hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer"
}
flex flex-row rounded-3xl  p-3 w-35 mt-6 self-end font-normal text-lg items-center justify-center   py-2
text-white gap-2 font-poppins`}>
{hasSaved ? 'Saved' : 'Save'}
</button>
      </div>
      </div>
       
    }
      {
   isCreateOpen &&
      <div onClick={() => {setCreateOpen(false) ;sethasCreated(false)}} className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute bg-black opacity-30 inset-0"></div>
<div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-xl z-10 overflow-y-auto font-poppins font-bold text-blue-400 text-2xl max-h-100 min-w-1/3" >Create User
<div className="flex flex-col gap-4 mt-6">
{
    columns2.map((e) => {
        return <div className="flex flex-col">
<label className="font-poppins text-lg text-gray-900 font-normal">{e}</label>
{
  e=='Role' ?
  <select
  onChange={ (o) => {
     const lister: any = createData;
      let eVal: any ='role';
  lister[eVal] = o.target.value;
  setCreateData(lister);
  }
  }
 className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        ">
     
  <option>USER</option>
              <option>SUPERVISOR</option>
           <option>ADMIN</option>
        </select>
  :
  e == 'Supervisor' || e=='Step' || e=='Module' || e=='Trainer' ?


 <select
  onChange={ (o) => {
     const lister: any = createData;
      let eVal: any =  e == 'Supervisor' ? 'supervisor' : e=='Step' ? 'actualstep' :  e=='Module' ? 'module' :  'trainer'
  lister[eVal] = o.target.value;
  setCreateData(lister);
  }
  }
 className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        ">
      <option>Select a { e == 'Supervisor' ? 'supervisor' : e == 'Step' ? 'step' : e=='Trainer' ? 'trainer':
        'module'}... </option>
 
  {
  e == 'Step' ?stepList.map((e) => <option>{e['stepname']}</option>) : e=='Module' ? moduleList.map((e) => <option>{e['modulename']}</option>) : e=='Trainer'?
   trainerList.map((e) => <option>{e['trainername']}</option>)
  :


  supervisorList.map((e) => <option>{e['supername']}</option>)}
        </select>


  :
 
  e == 'Email' || e == 'Password' ?
   <input
value={e=='Email' ? email : password}
onChange={(o) => {
 e=='Email' ? setEmail(o.target.value) : setPassword(o.target.value)


}}
placeholder={e} className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        "></input> :
  <input
  type={e == 'Hire Date' || e=='Next Date' ? 'date':'text'}
onChange={(o)=>{
  const lister: any = createData;
      let eVal: any =  e == 'Hire Date' ? 'hiredate': e == 'Step' ? 'actualstep' : e=='Next Date' ? 'nextdate'
  : e.toLocaleLowerCase()
  lister[eVal] = o.target.value;
  setCreateData(lister);
}}
placeholder={e} className="rounded-lg mt-2 pl-3
        text-lg
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-full
        cursor-pointer justify-center px-1 overflow-ellipsis
        "></input>}
        </div>
    })
}</div>
<button
onClick={() => {
  createUser();
}}
className={` ${hasCreated ?
  'bg-green-500 ' : "bg-blue-500 hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer"
}
flex flex-row rounded-3xl   p-3 w-35 mt-6 self-end font-normal text-lg items-center justify-center   py-2
text-white gap-2  font-poppins`}>
{hasCreated ? 'Created' : 'Create'}
</button>
      </div>
      </div>
       
    }
    {
          isLoading ?      <TailSpin color="#0000FF"></TailSpin>:
        <div className="w-full flex items-center justify-center  flex-col">
<h1 className="font-poppins text-blue-500 font-bold text-5xl self-baseline">Manage Users</h1>
{/* <p className="mt-3 font-poppins text-gray-600 text-xl self-baseline">View users who need to complete tests and generate tests</p> */}
{/* <input
placeholder="Search by username or supervisor..."
className="mt-5 border-gray-500 rounded-lg p-2 w-full font-poppins border-2"></input> */}
<div className="flex flex-row gap-5 mt-5 items-baseline w-full text-gray-500 font-poppins font-bold ">
  <button
onClick={() => {
 setCreateOpen(true);
 setCreateData({'machine':null, 'username':null, 'hiredate':null, 'module': null,
  'supervisor':null, 'actualstep':null, 'nextdate':null, 'role': 'USER', 'active':'Y',  'trainer':null,
 });
 setPassword('kurz1234');
 setEmail('');
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2
text-white gap-2 bg-blue-500 font-poppins font-normal">
Create User
</button>


   {/* <p className="text-xl">Filter by: </p>


 
        <select
        onChange={(e) => {setTestType(e.target.value)}}
        value={testType} className="rounded-lg
       
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-30
        cursor-pointer hover:bg-blue-400/20 hover:border-blue-400 hover:scale-103 transtion-all duration-300 justify-center px-1 overflow-ellipsis
        ">


            <option>
Test Type
</option>
{
  testTypes.map((entry) =>
  <option>{entry}</option>
  )


}
        </select>
         <select
           onChange={(e) => {setSelectUser(e.target.value)}}
           value={selectedUser}
         className="rounded-lg border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-30
        cursor-pointer hover:bg-blue-400/20 hover:border-blue-400 hover:scale-103 transtion-all duration-300 justify-center px-1 overflow-ellipsis
        ">


            <option>
Username
</option>
{
 uniqueUsers.map((entry) =>
  <option>{entry}</option>
  )


}


        </select >
        {
        !hasSupervisor &&
        <select
             onChange={(e) => {setSupervisor(e.target.value)}}
           value={selectedSupervisor}
           className="rounded-lg border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-30
        cursor-pointer hover:bg-blue-400/20 hover:border-blue-400 hover:scale-103 transtion-all duration-300 justify-center px-1 overflow-ellipsis
        ">


            <option>
Supervisor
</option>
{
supervisors.map((entry) =>
  <option>{entry}</option>
  )


}
        </select>
}
    */}


</div>
<div className=" rounded-md mt-7 w-full">
  <div className="flex flex-row bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg py-2    font-bold font-inter">
{
  columns.map((entry) => {
   if ( entry == 'Trainer'){
    return null;
   }
 return  <div className= {`m-2 ml-5 ${
 'w-1/8'
  }`}>
    <p >{entry} </p>
 
</div>
  }
  )
}
</div>
<div className="flex flex-col font-poppins ">
{
userData.filter((entry) => (testType == 'Test Type' ? true : entry['Test Type'] == testType) &&
 (selectedUser == 'Username' ? true : entry['User'] == selectedUser) &&
 (selectedSupervisor == 'Supervisor' ? true : entry['Supervisor'] == selectedSupervisor)
).map((entry) =>
   <div>
   <div className={`flex flex-row items-center`}>
 {   Object.values(entry).map((entrye: any, i) => {
 
if (i == 1  || i == 0 || i== 9||i==11 || i==12 || i==13 ){
  return;
}
   return (
 
 <div  className= {`ml-5  m-2 py-2
    ${
 'w-1/8'
  }
    `}>
 {


i == 10 ? <div className="flex flex-row">{entrye } <div className="flex-1"></div><Edit
onClick={() =>{
    setEditData(userData.filter((e) => e['username'] == entry['username'] ));
    setEditOpen(true)
}}
className="mr-1 cursor-pointer hover:text-blue-400"></Edit> </div> :


i == 3 || i==8
? <p>{getDates(entrye)}</p>
: <p>{entrye}</p>
 
 }
 
     </div>
   )


     
})}
   
    </div>
     <div className="bg-gray-400 h-0.5 w-full"></div>
     </div>
  )
}
</div>
</div>
</div>}
</section>
)
}
export default Users;

