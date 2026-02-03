import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
const Manager = () => {
  const [userData, setUserData] = useState([]);
    const [userData2, setUserData2] = useState([]);
     const [testData, setTestData] = useState([]);
     const loc  = useLocation();
     const username = loc.state ?? 'none';
    const [testData2, setTestData2] = useState([]);
    const [notAdmin, setNotAdmin] = useState(false);
      function getDates(date: string){
    if (date == '' || date == null){
      return '';
    } else {
const [year, month, day] = date.split('-').map(Number)

const date2 = new Date(year, month - 1, day)
 
    return date2.toLocaleDateString('en-US', {
  month:'numeric', 
day:'2-digit',
year:'numeric',
        });
      
      }
   
  }
   async function handleUpload(e: React.ChangeEvent<HTMLInputElement>,  path: any) {
 
  const file = e.target.files?.[0];
  if (!file){
    return;
  }
   
    const upload = await supabase
    .storage
    .from("Files")
    .update(path, file,  {upsert: true})




console.log('File upload error:', upload)




let list2: any =[...isUploaded, path]
   setIsUploaded(list2)
  //  setUserData(list)
  //  let list2: any =[...isUploaded, entry['id']]
  //  setIsUploaded(list2)
   

}
const[isUploaded, setIsUploaded] = useState([])
    const navigate = useNavigate();
    const [selectedPhase, setSelectedPhaae] = useState('');
    const [isUser, setIsUser] =useState(false);
     async function fetchUserData() {
       
try{ let dat=supabase.storage.from('photos').getPublicUrl('Abram Mills.jpg');
console.log('get url data',  );
console.log('get url data',  dat);
} catch (e){
  console.log('gt url error:', e);
}
    let session = await supabase.auth.getSession();
    let userData: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);

    if (userData.data[0]['role'] == 'USER'){
      setIsUser(true);
      setNotAdmin(true);
       setSelectedUser(userData.data[0]['username']);
     let newTestData: any = await supabase.from('testrecords').select().eq('username', userData.data[0]['username']).eq('step', userData.data[0]['actualstep']);
  let newTestData2: any = await supabase.from('testrecords').select().eq('username', userData.data[0]['username']);
 
  let newer: any = []
  for (const entry of newTestData.data){
    newer.push({'Module':entry['module'],
      'step':entry['step'], 'id':entry['id'],
      'Test Type': entry['type'], 'Date':entry['date'], 'Score':entry['score'], 'Result':entry['result'], 'path': entry['path']});
  }
 
 setTestData(newer);
  setTestData2(newTestData2.data);
  setUserData(userData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])) )
  setModulePhase(userData.data[0]['actualstep']);
  setSelectedPhaae(userData.data[0]['actualstep']);
  setdueDate(userData.data[0]['nextdate']);
} else {
      let userData2: any = userData.data[0]['role']== 'SUPERVISOR'  ? 
await supabase.from('users').select().eq('role', "USER").eq('active', 'Y').eq('supervisor', userData.data[0]['username'])
:
userData.data[0]['role']== 'TRAINER'  ? 
await supabase.from('users').select().eq('role', "USER").eq('active', 'Y').eq('trainer', userData.data[0]['username'])
:
await supabase.from('users').select().eq('role', "USER").eq('active', 'Y')
    
       let usertest2: any = await supabase.from('testrecords').select();
        setUserData(userData2.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
          setUserData2(userData2.data);
        
          setTestData2(usertest2.data);
       if (username != 'none'){
   setSelectedUser(username);
  let newUserData = userData2.data.filter((entry: any)=> entry['username'] ==username);
 
  let newTestData = usertest2.data.filter((entry: any)=> entry['username'] ==username && entry['step'] == newUserData[0]['actualstep'])
  let newer: any = []
  for (const entry of newTestData){
   
    newer.push({'Module':entry['module'],
      'step':entry['step'], 'id':entry['id'],
      'Test Type': entry['type'], 'Date':entry['date'], 'Score':entry['score'], 'Result':entry['result'], 'path':entry['path']});
  }
 setTestData(newer);
  setUserData(newUserData )
  setModulePhase(newUserData.length == 0 || newUserData == null ? '': newUserData[0]['actualstep']);
  setSelectedPhaae(newUserData.length == 0 || newUserData == null ? '': newUserData[0]['actualstep']);
  setdueDate(newUserData.length == 0 || newUserData == null ? '': newUserData[0]['nextdate']);
}
     
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
    
navigate(`/test/${entry['id']}`, {state: idk2})
  }


  const [modulePhase, setModulePhase] = useState('')
  const [selectedUser, setSelectedUser] = useState('Select a user...');
    const [dueDate, setdueDate] = useState('')
  return (
<section className="max-w-screen h-screen flex items-baseline mt-10 justify-center">


<div className="flex justify-center  flex-col w-full m-10">
<div className="flex flex-row gap-15">

<div className="flex flex-col">
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
 
  setSelectedUser(e.target.value);
  let newUserData = userData2.filter((entry)=> entry['username'] == e.target.value);
 
  let newTestData = testData2.filter((entry)=> entry['username'] == e.target.value && entry['step'] == newUserData[0]['actualstep']);
 
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
`${userData.length == 0 || selectedUser == 'Select a user...' ?'    ' : getDates(userData[0]['hiredate'])}` : entry == 'Supervisor:' ?
`${userData.length == 0 || selectedUser == 'Select a user...' ?'    ' : userData[0]['supervisor']}` : entry == 'Due Date' ?  
`${getDates(dueDate)}` :
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
</div>
<div className="flex-1"></div>
{ userData.length != 0 &&
<div  className="w-50 h-50"
    style={{
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // backgroundImage: `url('https://fjqbbgziphqfbvxuggkk.supabase.co/storage/v1/object/public/photos/Abram%20Mills.jpg')`
     backgroundImage: `url(${supabase.storage.from('photos').getPublicUrl(`${userData[0]['username']}.jpg`)['data']['publicUrl']})`
}}
></div>
}
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

navigate('/evaluation', {state: [userData[0]['username'], entry['Result'] != null ? entry['id'] : 'no id', entry['step']]})
  }  else if (entry['Test Type'] == 'Competency Test'){
    if (!isUser){
savedTest(entry);
    }
  } else {
    if (entry['path'] != null){
       let url =supabase.storage.from('Files').getPublicUrl(entry['path']);
     
      window.open(url.data.publicUrl.replace('%0D%0A', ''), "_blank", "noopener,noreferrer");
    } else {
    
navigate('/performance-review', {state: [userData[0]['username'], entry['Result'] != null ? entry['id'] : 'no id', entry['step']]})  
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
 className= {`
 
  m-2 py-2 ${entrye == 'PASS'  || entrye == 'READY' ? 'text-green-500 font-bold' : entrye == 'FAIL' || entrye == 'NOT READY' ? 'text-red-500 font-bold' : ''}
    ${
i==0  ?
'w-[20%]' :
i==4 ? 'w-[20%]' :
i==5? 'w-[20%]' : i==3 ? 'w-[20%]' :
i==2 ?'w-[20%]':
'w-[20%]'
  }
    `}>
   
 { i==4 ? getDates(entrye) : 
// entry['path'] != null && i==6 ?
// <div className=" flex flex-row  gap-9 items-center">
//   {entrye}
// <label 
// onClick={(e)=>e.stopPropagation()}
// className= {`
// flex flex-row rounded-3xl   p-3 w-35  text-lg items-center justify-center  font-normal transition-all
// duration-300 py-2 text-white gap-2  font-poppins 
// ${isUploaded.includes(entry['path']) ? 'bg-green-500' : 'hover:bg-orange-400  bg-orange-300 hover:scale-102 cursor-pointer'} 
// `}>
//  {isUploaded.includes(entry['path']) ? 'Reuploaded' : 'Reupload'}

//  <input
//  onChange={(e) => {
// handleUpload(e, entry['path']);


// }}
// type="file"
// className="hidden"/>
// </label>
// </div>

// : 
 entrye
 
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
</div>
</section>
  );
}
export default Manager;

