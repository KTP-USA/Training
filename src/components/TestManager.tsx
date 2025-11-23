
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const TestManager = () =>{
  function shuffleList(myList: any){
    for (let i: number = 0; i<myList.length; i++){
const j = Math.floor(Math.random() * (i+1));
[myList[i], myList[j]] = [myList[j], myList[i]];
    }
    return myList;
  }


 async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, entry: any) {
  
  const file = e.target.files?.[0];
  if (!file){
    return;
  }
    const filePath = `uploads/${file.name.replace(/\s/g, "_")}`; 
    console.log('file', filePath, file, entry)
 


  const { data, error } = await supabase
    .storage
    .from("Files")
    .upload(filePath, file, { contentType: file.type, upsert: true });

  if (error) {
  
    console.error("Message:", error.message);
   
    return;
  }

  console.log("SUCCESS:", data);
await supabase.from('testrecords').update({'path':filePath}).eq(
  'id', entry['id']


)
let list: any = userData.map((e) => { return e==entry ? {...entry, 'path': filePath} :
 e})

   setUserData(list)
}
  async function generateTest(step: String, module: String, username: String , type: String, entry: any ){
    let qBankData = await supabase.from('questions').select().eq('step', step).eq('module', module).eq('optiontext', '') ;
  
   
  let qBankData2 = shuffleList(qBankData.data);
   console.log('shuffled', qBankData2)
   let qBank: Array<any> = [];

   while (qBank.length < (step == '30D' ? 10 : step == '90D' ? 15 : step=='180D'? 20 : step=='1Y' ? 30 :step=='2y' ? 40 : 50 )){
    

  qBank.push(qBankData2[qBank.length]);

  }
  console.log('hh', qBank)
  let fetchcontrolnbr = await supabase.from('testrecords').select().eq('step', step).eq('module', module).eq('username', username).eq('type', type).is('result', null)
  let insertList = qBank.map((e, i)=> {
   
    return {'questiontest':i+1, 'questionid': e['questionid'], 'module': module, 'step':step, 
     
      'correcttest': type == 'Competency Test' ? e['correctoption'] : null, 
'controlnbr':fetchcontrolnbr.data![0]['id'], 'username':username

    }
  });
let list: any = userData.map((e) => { return e==entry ? {...entry, 'Action':fetchcontrolnbr.data![0]['id']} :
 e})

   setUserData(list)
for (const entry of insertList){
  await supabase.from('savedtest').insert(entry);
  
}

  }
  const testTypes = ['Competency Test', 'Technical Evaluation', 'Performance review']
  const navigater = useNavigate();
  const [selectedUser, setSelectUser] = useState('Username')
    const [isLoading, setisLoading]=useState(true);
    const [selectedSupervisor, setSupervisor] = useState('Supervisor')
    const [supervisors, setSupList] = useState([])
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [uploadData, setUploadData] = useState({});
    const [hasSupervisor, setSupervisora] = useState(true);
    const [uploamenu, setUploadMenu] = useState(false);
    const [testType, setTestType] = useState('Test Type')
    useEffect(() => {
async function loadData(){
   let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('users').select().eq('uid', session.data.session?.user.id);
    if ( userData1.data[0]['role'] != 'SUPERVISOR'){
setSupervisora(false);
    }
let loadedData: any = userData1.data[0]['role'] == 'SUPERVISOR' ? await supabase.from('users').select().eq('supervisor', userData1.data[0]['username'])

    : await supabase.from('users').select().eq('role', "USER")
    
    loadedData = loadedData.data.filter((entry:any) => {
        let nextDate: Date = new Date(entry['nextdate']);
        let now: Date = new Date;
now.setDate(now.getDate() + 10);
       return now > nextDate;
    
    }  ).sort((a: any,b: any)=> a['username'].localeCompare(b['username']))
    let testData: any =  await supabase.from('testrecords').select().is('score', null);
;
console.log('test data', testData);
    
    loadedData.sort((a: any,b:any) => {
 let aDate: Date = new Date(a['nextdate']);
  let bDate: Date = new Date(b['nextdate']);
 return aDate.getTime() -bDate.getTime();
    })
    let data: any = [];
    let supervisors: any = [];
    for (const entry of loadedData){
      if (!supervisors.includes(entry['supervisor'])){
supervisors.push(entry['supervisor']);
      }
        let testsUncompleted = testData.data.filter(
            (testentry: any) => 
    entry['username'] == testentry['username'] && entry['actualstep'] == testentry['step'] && testentry['score'] == null && testentry['result'] == null)
           
            for (const entry2 of testsUncompleted){
data.push({'User':entry['username'], 'Hire Date':entry['hiredate'], 'Module':entry['module'],
    "Supervisor":entry['supervisor'],
    'Test Type':entry2['type'],
    'Step':entry['actualstep'], 'Next Date':entry['nextdate'], 'Action': entry2['controlnbr'] != null ? entry2['controlnbr'] : 'no number',
    'path':entry2['path'], 'id':entry2['id']
})
    }
}
    setUserData(data);
    setSupList(supervisors);
    setUniqueUsers(loadedData.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])).map((e:any) => e['username']))
    setisLoading(false);
}
loadData();
    }, [])
       function getNextDate(date: any, step: String){
 date = new Date(date);
 if (step == '30D'){
    date = date.setDate(date.getDate()+60);
    return date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        });
 } else  if (step == '60D'){
    date = date.setDate(date.getDate()+180);
    return date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        });
 } else  if (step == '180D'){
    date = date.setDate(date.getFullYear()+1);
    return date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        });
 } else  if (step == '1Y'){
    date = date.setDate(date.getDate()+2);
    return date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        });
 }  else  if (step == '2Y'){
    date = date.setDate(date.getDate()+3);
    return date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        });
 } 
    }
    const [userData, setUserData] = useState([]);
    async function handlePassFail(data: any, type: any){
   let date = new Date();
   await supabase.from('testrecords').update({
        
        'username':data['User'],
        'date': date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        }),
        'module':data['Module'],
    'supervisor': data['Supervisor'],
        'type':'Performance review',
        'result': type == 'pass' ? 'PASS' : 'FAIL',
        'step':data['Step'],
        
    }).eq('id', data['id']);
    if (type == 'fail'){
   await supabase.from('testrecords').insert({
   
    'username': data['User'],
    'supervisor':data['Supervisor'],
    'type': 'Performance review',
 
    'module': data['Module'],
    'step':data['Step']
});   
    }
let stuoidlist: any = await supabase.from('testrecords').select().eq('module', data['module']).eq('step',data['actualstep']).eq('username', data['username'])
.eq('supervisor', data['supervisor']).eq('result', 'PASS');
const list = ['Technical Evaluation', 'Competency Test', 'Performance review']
if (stuoidlist.data.length >= 3  && stuoidlist.data.map((e: any) => e['type']).includes(list)){
    await supabase.from('users').update({
          'actualstep': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' : 
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
  'nextdate': getNextDate(data['hiredate'], stuoidlist.data[0]['step']  )
 } );

for (const item of list){

await supabase.from('testrecords').insert({
   
    'username':data['User'],
    'supervisor':data['Supervisor'],
    'type': item,
    'step': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' : 
  stuoidlist.data['step'] == '1Y' ? '2Y' : '3Y',
    'module': data['Module'],
})
}
}
setUploadMenu(false);
    }
    let columns = ['Username', 'Hire Date', 'Module', 'Supervisor', 'Test Type', 'Step', 'Next Date']
return (
<section className="flex justify-center items-center flex-col my-15 mx-10">
   {
  uploamenu &&
      <div onClick={() =>setUploadMenu(false)} className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute bg-black opacity-30 inset-0"></div>
<div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-xl z-10 overflow-y-auto
 font-poppins font-bold text-blue-400 text-2xl max-h-100 flex-col px-15 py-8 flex items-center justify-center" >
  Is this a pass or a fail?
<div className="flex flex-row gap-3 mb-3">
  <button
onClick={() => {
 handlePassFail(uploadData, 'fail');
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 mt-6 self-end font-normal text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-red-600 py-2
text-white gap-2 bg-red-500 font-poppins">
Fail
</button>
<button
onClick={() => {
 handlePassFail(uploadData, 'pass');
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 mt-6 self-end font-normal text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-green-600 py-2
text-white gap-2 bg-green-500 font-poppins">
Pass
</button>
</div>

      </div>
      </div>
        
    }
    {
          isLoading ?      <TailSpin color="#0000FF"></TailSpin>: 
        <div className="w-full flex items-center justify-center  flex-col">
<h1 className="font-poppins text-blue-500 font-bold text-5xl self-baseline">Manage Tests</h1>
{/* <p className="mt-3 font-poppins text-gray-600 text-xl self-baseline">View users who need to complete tests and generate tests</p> */}
{/* <input 
placeholder="Search by username or supervisor..."
className="mt-5 border-gray-500 rounded-lg p-2 w-full font-poppins border-2"></input> */}
<div className="flex flex-row gap-5 mt-5 items-baseline w-full text-gray-500 font-poppins font-bold ">
   <p className="text-xl">Filter by: </p>

 
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
   

</div>
<div className=" rounded-md mt-7 w-full">
  <div className="flex flex-row bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg py-2    font-bold font-inter">
{
  columns.map((entry) =>
  <div className= {`m-2 ml-5 ${
  entry == 'Test Type' ?
'w-[10%]' : entry == 'Supervisor' ? 'w-[10%]' : 
entry == 'User' ? 'w-[10%]' : entry == 'Hire Date' ? 'w-[10%]' :
entry == 'Module' ?'w-[10%]': entry == 'Next Date' ? 'w-[10%]' :
'w-[10%]'
  }`}>
    <p >{entry} </p>
  
  </div>
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
 
if (i==8 || i==9){
  return;
}
   return (
 
 <div  className= {`ml-5  m-2 py-2 ${entrye == 'PASS' ? 'text-green-500 font-bold' : entrye == 'FAIL' ? 'text-red-500 font-bold' : ''}
    ${
columns[i] == 'Test Type' ?
'w-[10%]' : columns[i] == 'Supervisor' ? 'w-[10%]' : 
columns[i] == 'User' ? 'w-[10%]' : columns[i] == 'Hire Date' ? 'w-[10%]' :
columns[i] == 'Module' ?'w-[10%]': columns[i] == 'Next Date' ? 'w-[10%]' :
'w-[10%]' 
  }
    `}>
 {
 i == 7 ? 
 entrye == 'no number' ?
 entry['Test Type'] == 'Performance review' && entry['path'] == null
 ? 
<label className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2 text-white gap-2 bg-blue-500 font-poppins">
  Upload
 <input
 onChange={(e) => {
  // setUploadMenu(true);
  handleUpload(e, entry)
  setUploadData(entry);
  console.log('ent ent', entry)

}}
type="file"
className="hidden"/>
</label>
 : 
<button
onClick={() => {
  if (entry['Test Type'] == 'Technical Evaluation'){
navigater('/evaluation', {state: entry['User']})
  } else if (entry['Test Type'] == 'Competency Test') {
generateTest(entry['Step'], entry['Module'], entry['User'], entry['Test Type'], entry);
  } else{
    let url =supabase.storage.from('Files').getPublicUrl(entry['path'])
      window.open(url.data.publicUrl.replace('%0D%0A', ''), "_blank", "noopener,noreferrer");
    // navigater('/performance-review', {state: [null, null, url.data.publicUrl ?? 'no path']})
  }
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2
text-white gap-2 bg-blue-500 font-poppins">
{entry['Test Type'] == 'Technical Evaluation' ? 'View' : entry['Test Type'] == 'Competency Test' ? 'Generate' : 'View'}
</button> 

: <p className="font-extrabold text-blue-500 ml-5 ">Code: {entrye}</p>
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
export default TestManager;