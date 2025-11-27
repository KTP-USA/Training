import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
const Manager = () => {
  const [userData, setUserData] = useState([]);
    const [userData2, setUserData2] = useState([]);
     const [testData, setTestData] = useState([]);
    const [testData2, setTestData2] = useState([]);
    const [notAdmin, setNotAdmin] = useState(false);
    const navigate = useNavigate();
    const [selectedPhase, setSelectedPhaae] = useState('');
     async function fetchUserData() {
    let session = await supabase.auth.getSession();
    let userData: any = await supabase.from('users').select().eq('uid', session.data.session?.user.id);
    console.log('userd', userData, userData.data[0]['role']);
    if (userData.data[0]['role'] == 'USER'){
      setNotAdmin(true);
       setSelectedUser(userData.data[0]['username']);
  console.log('tttt23', testData2, userData.data)
     let newTestData: any = await supabase.from('testrecords').select().eq('username', userData.data[0]['username']).eq('step', userData.data[0]['actualstep']);
  
  console.log('ttttt', newTestData.data)
  let newer: any = []
  for (const entry of newTestData.data){
    newer.push({'Module':entry['module'],
      'step':entry['step'], 'id':entry['id'],
      'Test Type': entry['type'], 'Date':entry['date'], 'Score':entry['score'], 'Result':entry['result'], 'path': entry['path']});
  }
 setTestData(newer);
  setUserData(userData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])) )
  setModulePhase(userData.data[0]['actualstep']);
  setSelectedPhaae(userData.data[0]['actualstep']);
  setdueDate(userData.data[0]['nextdate']);
} else if (userData.data[0]['role'] == 'SUPERVISOR'){
     let userData2: any = await supabase.from('users').select().eq('role', 'USER').eq('supervisor', userData.data[0]['username']);
       let usertest2: any = await supabase.from('testrecords').select().eq('supervisor', userData.data[0]['username']);;
       
      setUserData(userData2.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
          setUserData2(userData2.data);
          setTestData2(usertest2.data);
} else if (userData.data[0]['role'] == 'ADMIN'){
      let userData2: any = await supabase.from('users').select().eq('role', 'USER');
       let usertest2: any = await supabase.from('testrecords').select();
       
      setUserData(userData2.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
          setUserData2(userData2.data);
          setTestData2(usertest2.data);
}
   }
  useEffect(() => {
  
fetchUserData();
}, []);
 function shouldBeBlue( i:any){
      if (i < Object.keys(times).indexOf(modulePhase) ){
        
      
  return true;
        

      
    } 
    return false;
  }
  const topBar = ['Select user:','Hire Date:', 
    'Training Module', 'Machine', 'Supervisor:', 'Module Phase', 'Due Date'
  ]

  const [times] = useState({'30D':false, '90D':false, '180D':false, '1Y':false, '2Y':false, '3Y':false})
  const tableColumns = [
    
     'Module',
    'Test Type',
    'Test Date',
    'Score',
    'Result' 
  ]
 
  async function savedTest(entry: any) {
  
        let idk: any =  await supabase.from('savedtest').select().eq('controlnbr', entry['id']);
    let idk3=idk.data
    let idk2: any = {};
    for (const entrye of idk3){
idk2[entrye['questionid']] = entrye['useranswer']
    }
    console.log('idk', idk2)
navigate(`/test/${entry['id']}`, {state: idk2})
  }

  const [modulePhase, setModulePhase] = useState('')
  const [selectedUser, setSelectedUser] = useState('Select a user...');
    const [dueDate, setdueDate] = useState('')
  return ( 
<section className="max-w-screen h-screen flex items-baseline mt-20 justify-center">

<div className="flex justify-center  flex-col w-full m-10"> 
<div className="flex flex-row gap-15">

{
topBar.map((entry) =>
<div className="flex flex-col gap-4 items-baseline
justify-baseline
"> 
<p className={`font-poppins font-bold text-md text-gray-800   ${entry == 'Module Phase'  || entry == 'Due Date' ? 'text-blue-400':''}`}>
{entry}
  </p>
  {
    entry == 'Select user:'
 ? <div> {
  notAdmin ? <p
   className={`border-2 rounded-md border-blue-400 p-2 
 font-poppins w-full flex items-center justify-center min-h-11`}
  >{selectedUser}</p> :
  <select 
 value={selectedUser}
 onChange={(e)=>{ 
  console.log('init', e.target.value, selectedUser, userData)
  
  setSelectedUser(e.target.value);
  let newUserData = userData2.filter((entry)=> entry['username'] == e.target.value);
  console.log('newr', newUserData);
  let newTestData = testData2.filter((entry)=> entry['username'] == e.target.value && entry['step'] == newUserData[0]['actualstep'])
  let newer: any = []
  for (const entry of newTestData){
    newer.push({'Module':entry['module'],
      'step':entry['step'], 'id':entry['id'],
      'Test Type': entry['type'], 'Date':entry['date'], 'Score':entry['score'], 'Result':entry['result'], 'path':entry['path']});
  }
 setTestData(newer);
  setUserData(newUserData )
  setModulePhase(newUserData[0]['actualstep']);
  setSelectedPhaae(newUserData[0]['actualstep']);
  setdueDate(newUserData[0]['nextdate']);
console.log('my,lie', selectedUser, userData);
}}
  
   className='border-2 rounded-md  border-blue-400 p-2 
 font-poppins'>
   <option>Select a user...</option>
  {
userData2.map((entry) =>  
  <option>{entry['username']}</option>
)
}
 </select>}</div>
 :
 <div
onClick={  () => {
    
   
}
}
  className={`border-2 rounded-md border-blue-400 p-2 
 font-poppins w-full flex items-center justify-center min-h-11
  ${entry == 'Module Phase'  || entry == 'Due Date' ? 'bg-blue-300/30':''}`}
 >
{
entry =='Hire Date:' ? 
`${userData.length == 0 || selectedUser == 'Select a user...' ?'    ' : userData[0]['hiredate']}` : entry == 'Supervisor:' ?
`${userData.length == 0 || selectedUser == 'Select a user...' ?'    ' : userData[0]['supervisor']}` : entry == 'Due Date' ?  
`${dueDate}` :
 entry == 'Module Phase' ? `${modulePhase}` :`${userData.length == 0 || selectedUser == 'Select a user...' ?'    ' :
 entry == 'Training Module' ? userData[0]['module'] :
 userData[0]['machine']}`
}
 </div>
 }
  </div>
)
}

</div>
<div className="flex flex-row gap-5">
{
 Object.keys(times).map((entry, i) =>
<div

onClick={()=>{
    let newTestData = testData2.filter((entrye)=> entrye['username'] ==selectedUser && entrye['step'] == entry)
  let newer: any = []
  for (const entry of newTestData){
    newer.push({'Module':entry['module'],
      'step':entry['step'], 'id':entry['id'],
      'Test Type': entry['type'], 'Date':entry['date'], 'Score':entry['score'], 'Result':entry['result'], 'path': entry['path']});
  }
  setTestData(newer)
 
  setSelectedPhaae(entry)} }
className={`mt-8 mb-2 border-black border-2 flex items-center justify-center p-4 
py-2
 rounded-md  font-poppins cursor-pointer hover:scale-103 w-fit
transition-all duration-300 ${

  shouldBeBlue(i) ?`bg-green-300/30 ${selectedPhase == entry ? 'border-blue-500' : 'border-green-500'} ` :
   i==Object.keys(times).indexOf(modulePhase) ? 
 ` bg-blue-400/20 ${selectedPhase == entry ? 'border-blue-500' : 'border-blue-200'} ` : `${selectedPhase == entry ? 'border-blue-500' : ''} `}
 
  `}
  >{entry}</div>
)}
</div>
<div className=" rounded-md mt-5">
  <div className="flex flex-row bg-gradient-to-r from-sky-100 to-blue-300 rounded-lg py-2 pl-2   font-bold font-inter">
{
  tableColumns.map((entry) => {
    if (entry == 'id'){
      return;
    }
 return  <div className= {`m-2 ${
  entry == 'Test Type' ?
'w-[20%]' : entry == 'Score' ? 'w-[20%]' : 
entry == 'Result' ? 'w-[20%]' : entry == 'Test Date' ? 'w-[20%]' :
entry == 'Module' ?'w-[20%]':
'w-[10%]'
  }`}>
    <p >{entry} </p>
  
  </div>
})}

</div>
<div className="flex flex-col font-poppins pl-2 ">
{
  testData.map((entry) =>
   <div>
   <div
   onClick={
    () => {
      if (entry['Test Type'] == 'Technical Evaluation'){
    console.log('idddd', entry['id'], entry)
navigate('/evaluation', {state: [userData[0]['username'], entry['id']]})
  }  else if (entry['Test Type'] == 'Competency Test'){
savedTest(entry);
  } else {
    console.log(';ffg', entry['path'], entry)
    if (entry['path'] != null){
       let url =supabase.storage.from('Files').getPublicUrl(entry['path']);
     
      window.open(url.data.publicUrl.replace('%0D%0A', ''), "_blank", "noopener,noreferrer");
    }
  }
    }
   }
   className={`flex flex-row cursor-pointer hover:bg-gray-100 transition-all`}>
 {   Object.values(entry).map((entrye: any, i) => {
  if (i==1 || i==2 || i ==7) return null;

   return (
 
 <div 
 onClick={()=> {
     
 }}
 className= {` m-2 py-2 ${entrye == 'PASS'  || entrye == 'READY' ? 'text-green-500 font-bold' : entrye == 'FAIL' || entrye == 'NOT READY' ? 'text-red-500 font-bold' : ''}
    ${
i==0  ?
'w-[20%]' :
i==4 ? 'w-[20%]' : 
i==5? 'w-[20%]' : i==3 ? 'w-[20%]' :
i==2 ?'w-[20%]':
'w-[20%]'
  }
    `}>
 {  entrye}
  
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
</div>
</section>
  );
}
export default Manager;