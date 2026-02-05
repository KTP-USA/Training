





import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
// import { RefreshCcw } from "lucide-react";
const TestManager = () =>{
  function shuffleList(myList: any){
    for (let i: number = 0; i<myList.length; i++){
const j = Math.floor(Math.random() * (i+1));
[myList[i], myList[j]] = [myList[j], myList[i]];
    }
    return myList;
  }








const [isUploaded, setIsUploaded] = useState([])
 async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, entry: any) {
 
  const file = e.target.files?.[0];
  if (!file){
    return;
  }
    // const filePath = `uploads/${file.name.replace(/\s/g, "_")}`;
    const filePath = `uploads/${entry['id']}`;
 








  const upload = await supabase
    .storage
    .from("Files")
    .upload(filePath, file, { contentType: file.type, upsert: true });






console.log('File upload error:', upload.error)
const {error} = await supabase.from('testrecords').update({'path':filePath}).eq(
  'id', entry['id']
)


console.log('Testrecords Path Column Error Message:', error)
let list: any = userData.map((e) => { return e==entry ? {...entry, 'path': filePath} :
 e})




   setUserData(list)
   let list2: any =[...isUploaded, entry['id']]
   setIsUploaded(list2)
   
}
  async function generateTest(step: String, module: String, username: String , type: String, entry: any ){
    setProcessing(true);

    let qBankData = 
    (step == '3Y' && (entry['machine'] == 'LM84' || entry['machine'] == 'LM801')) ?  await supabase.from('questions').select().eq('step', `${step}-${entry['machine']}`).eq('module', module).eq('optiontext', '') :
    await supabase.from('questions').select().eq('step', step).eq('module', module).eq('optiontext', '') ;
 
   console.log('helloL', qBankData)
  let qBankData2 = shuffleList(qBankData.data);
   let qBank: Array<any> = [];


if ((qBankData.data?.length ?? 0) < (step == '30D' ? 10 : step == '90D' ? 15 : step=='180D'? 20 : step=='1Y' ? 30 :step=='2y' ? 40 : 50 ) ){
qBank = qBankData2;
}
else {
   while (qBank.length < (step == '30D' ? 10 : step == '90D' ? 15 : step=='180D'? 20 : step=='1Y' ? 30 :step=='2y' ? 40 : 50 )){
   




  qBank.push(qBankData2[qBank.length]);


   
   }
  }
  let fetchcontrolnbr = await supabase.from('testrecords').select().eq('step', step).eq('module', module).eq('username', username).eq('type', type).is('result', null);
  await supabase.from('testrecords').update({'controlnbr':fetchcontrolnbr.data![0]['id'], }).eq('id', fetchcontrolnbr.data![0]['id'])
  let userdata : any = await supabase.from('users').select().eq('username', fetchcontrolnbr.data![0]['username']);
  console.log('qbank ', qBank, 'og' , qBankData.data);
  let insertList = qBank.map((e, i)=> {

    return e == null ? null : {'questiontest':i+1, 'questionid': e['questionid'], 'module': module, 'step':step,
     'trainer':userdata.data[0]['trainer'], 'supervisor':userdata.data[0]['supervisor'],
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



setProcessing(false)
  }
  const [isProcessing,setProcessing] = useState(false);
  function getDates(date: string, ){
    
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
  const [testTypes, settestTypes] = useState( ['Competency Test', 'Technical Evaluation', 'Performance review'])
  const navigater = useNavigate();
  const [selectedUser, setSelectUser] = useState('Username')
let now = new Date;
now.setDate(now.getDate() +10);
  const [maxDate, setMaxDate] =useState(now.toISOString().split('T')[0])
    const [isLoading, setisLoading]=useState(true);
    const [selectedSupervisor, setSupervisor] = useState('Supervisor')
    const [supervisors, setSupList] = useState([])
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [uploadData, setUploadData] = useState({});
    const [hasSupervisor, setSupervisora] = useState(true);
    const [testType, setTestType] = useState('Test Type')
//     async function regenData() {
//       setisLoading(true);
//   let trainer: boolean = false;
//    let session = await supabase.auth.getSession();
//     let userData1: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);
 
//      if (userData1.data[0]['trainer'] == 'Y' && (userData1.data[0]['role'] != 'SUPERVISOR' && userData1.data[0]['role'] != 'ADMIN' ) ){
// trainer= true;
//     }
     
   
// let loadedData: any = userData1.data[0]['role'] == 'SUPERVISOR' ? await supabase.from('users').select().eq('supervisor', userData1.data[0]['username'])




//     : await supabase.from('users').select().eq('role', "USER")
   
//     loadedData = loadedData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username']))
//     console.log('trainer', trainer)
//     let testData: any =  trainer ? await supabase.from('testrecords').select().is('result', null).is('score', null ).neq('type', 'Performance review')
//     :
//    ( userData1.data[0]['trainer'] == 'Y' && userData1.data[0]['role'] == 'SUPERVISOR' ) || userData1.data[0]['role'] == 'ADMIN'
//    ?  
     
//     await supabase.from('testrecords').select().is('result', null).is('score', null):
//     await supabase.from('testrecords').select().neq
//     ('type', 'Technical Evaluation').is('result', null).is('score', null);


// let data2 = trainer?
//   {'data':[]} :
// await supabase.from('testrecords').select().is('path', null).not('result','is', null)
// .not('score','is', null).neq('result', 'NOT READY')
// .eq('type', 'Performance review');


// testData['data'] = trainer ? [...testData.data] : [...testData.data, ...data2['data']?? []]
// testData =testData.data.sort((a: any,b:any) => {
//  let aDate: Date = new Date(a['nextdate']);
//   let bDate: Date = new Date(b['nextdate']);
//  return aDate.getTime() -bDate.getTime();
//     });




//     let data: any = [];
//     let supervisors: any = [];
//     for (const entry of loadedData){
//       if (!supervisors.includes(entry['supervisor'])){
// supervisors.push(entry['supervisor']);
//       }
//         let testsUncompleted = testData.filter(
   
//             (testentry: any) => {
           
//     return entry['username'] == testentry['username'] && entry['actualstep'] == testentry['step'] })
           
//             for (const entry2 of testsUncompleted){
// data.push({'User':entry['username'], 'Hire Date':entry['hiredate'], 'Module':entry['module'],
//     "Supervisor":entry['supervisor'],
//     'Test Type':entry2['type'],
//     'Step':entry['actualstep'], 'Next Date':entry2['nextdate'], 'Action':
//     entry2['result'] == 'READY' ? 'READY' :
//     entry2['controlnbr'] != null ? entry2['controlnbr'] : 'no number',
//     'path':entry2['path'], 'id':entry2['id']
// })
         
//     }
// }
// data = data.sort((a: any,b:any) => {
//  let aDate: Date = new Date(a['Next Date']);
//   let bDate: Date = new Date(b['Next Date']);
//  return aDate.getTime() -bDate.getTime();
//     });




//      setUserData(data);
//     setisLoading(false);
   
//     }
const [username, setUsername] = useState('');
const [Trainers, setTrainers] = useState([]);
    useEffect(() => {
async function loadData(){




  let trainer: boolean = false;
   let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);
    setUsername(userData1.data[0]['username']);
    if ( userData1.data[0]['role'] != 'SUPERVISOR'){
setSupervisora(false);
    }
    if (userData1.data[0]['trainer'] == 'Y' && (userData1.data[0]['role'] != 'SUPERVISOR' && userData1.data[0]['role'] != 'ADMIN' ) ){
trainer= true;
settestTypes(['Competency Test', 'Technical Evaluation'])
    }
     if (userData1.data[0]['trainer'] == null && userData1.data[0]['role']== 'SUPERVISOR' ){


settestTypes(['Competency Test', 'Performance review'])
    }
   
let loadedData: any = 
userData1.data[0]['role']== 'SUPERVISOR'  ? 
await supabase.from('users').select().eq('role', "USER").eq('active', 'Y').eq('supervisor', userData1.data[0]['username'])
:
userData1.data[0]['role']== 'TRAINER'  ? 
await supabase.from('users').select().eq('role', "USER").eq('active', 'Y').eq('trainer', userData1.data[0]['username'])
:
await supabase.from('users').select().eq('role', "USER").eq('active', 'Y')
    
  
    loadedData = loadedData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username']))
   
    let testData: any =  trainer ? await supabase.from('testrecords').select().is('result', null).is('score', null ).neq('type', 'Performance review')
    :
   ( userData1.data[0]['trainer'] == 'Y' && userData1.data[0]['role'] == 'SUPERVISOR' ) || userData1.data[0]['role'] == 'ADMIN'
   ?  
     
    await supabase.from('testrecords').select().is('result', null).is('score', null) :
    await supabase.from('testrecords').select().neq
    ('type', 'Technical Evaluation').is('result', null).is('score', null)


let data2 = trainer?
  {'data':[]} :
await supabase.from('testrecords').select().is('path', null).not('result','is', null)
.not('score','is', null).neq('result', 'NOT READY')
.eq('type', 'Performance review');


testData['data'] = trainer ? [...testData.data] : [...testData.data, ...data2['data']?? []]


testData =testData.data.sort((a: any,b:any) => {
 let aDate: Date = new Date(a['nextdate']);
  let bDate: Date = new Date(b['nextdate']);
 return aDate.getTime() -bDate.getTime();
    });




    let data: any = [];
    let idk : any = [];
    let supervisors: any = [];
    let trainers: any = [];
  let findit: any = await supabase.from('testrecords').select().eq('type', 'Competency Test').eq('result', 'PASS')
    testData = testData.filter((e: any) => {
     
      if (e['type'] == 'Performance review' && e['result'] == 'READY' ){


let findit2 = findit.data.filter((er: any) =>
 
 
  {
   
  return er['username'] == e['username'] && e['module'] == er['module'] && e['step'] == er['step']} )


if (findit2 != null && findit2.length != 0 ){
  idk.push(e['id'])
  return true;
} else {
  return false;
}
      }
      return true;
      })
    for (const entry of loadedData){
      if (!supervisors.includes(entry['supervisor'])){
supervisors.push(entry['supervisor']);
      }
        if (!trainers.includes(entry['trainer'])){
trainers.push(entry['trainer']);
      }
        let testsUncompleted = testData.filter(
   
            (testentry: any) => {
           
    return entry['username'] == testentry['username'] && (idk.includes(testentry['id']) ? true : entry['actualstep'] == testentry['step']) })
   
          
            for (const entry2 of testsUncompleted){
data.push({'User':entry['username'], 'Hire Date':entry['hiredate'], 'Module':entry['module'],
    "Supervisor":entry['supervisor'],
        "Trainer": entry['trainer'], 
    'Test Type':entry2['type'], 

    'Step':entry2['step'], 'Next Date':entry2['nextdate'], 'Action':
    entry2['result'] == 'READY' ? 'READY' :
    entry2['controlnbr'] != null ? entry2['controlnbr'] : 'no number',
    'path':entry2['path'], 'id':entry2['id'], 
    "machine":entry2['machine']
})
         
    }
}
data = data.sort((a: any,b:any) => {
 let aDate: Date = new Date(a['Next Date']);
  let bDate: Date = new Date(b['Next Date']);
 return aDate.getTime() -bDate.getTime();
    });




    setUserData(data);
    setTrainers(trainers);
    setSupList(supervisors);
    setUniqueUsers(loadedData.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])).map((e:any) => e['username']))
    setisLoading(false);
}
loadData();
    }, []);
    const [regenIds, setRegenIds] = useState<Array<any>>([]);
 async   function regenTest(controlnbr: any){
 
let fetchTest = await supabase.from('savedtest').select().eq('controlnbr', controlnbr);
let step = fetchTest.data![0]['step'];
let mod = fetchTest.data![0]['module'];
    let qBankData = await supabase.from('questions').select().eq('step', step).eq('module', mod).eq('optiontext', '') ;
 
   
  let qBankData2 = shuffleList(qBankData.data);
   let qBank: Array<any> = [];




   while (qBank.length < (step == '30D' ? 10 : step == '90D' ? 15 : step=='180D'? 20 : step=='1Y' ? 30 :step=='2y' ? 40 : 50 )){
   




  qBank.push(qBankData2[qBank.length]);




  }
  let insertList = qBank.map((e, i)=> {
   
    return {'questiontest':i+1, 'questionid': e['questionid'],
     
      'correcttest': e['correctoption'],
 'useranswer':null,




    }
  });




for (const entry of insertList){
  await supabase.from('savedtest').update(entry).eq('questionid', entry['questionid']).eq('controlnbr', controlnbr);
 
}




let b4 = regenIds;
let insert: any = [...regenIds, controlnbr]
setRegenIds(insert)
     setTimeout(() => {
        setRegenIds(b4)
    }, 5000)
    }
    const [userData, setUserData] = useState([]);
//     async function handlePassFail(data: any, type: any){
//    let date = new Date();
//    await supabase.from('testrecords').update({
       
//         'username':data['User'],
//         'date': date.toLocaleDateString('en-US', {
// year:'2-digit',
// month:'numeric',
// day:'2-digit'
//         }),
//         'module':data['Module'],
//     'supervisor': data['Supervisor'],
//         'type':'Performance review',




//       'score': type == 'pass' ? 'OK':'NOT READY',
//         'result': type == 'pass' ? 'PASS' : 'FAIL',
//         'step':data['Step'],
       
//     }).eq('id', data['id']);
//     if (type == 'fail'){
//    await supabase.from('testrecords').insert({
   
//     'username': data['User'],
//     'supervisor':data['Supervisor'],
//     'type': 'Performance review',
 
//     'module': data['Module'],
//     'step':data['Step']
// });  
//     }
   
// let stuoidlist: any = await supabase.from('testrecords').select().eq('module', data['Module']).eq('step',data['Step']).eq('username', data['User'])
// .eq('supervisor', data['Supervisor']).eq('result', 'PASS');




// if (stuoidlist.data.length >= 1 && stuoidlist.data.some((e: any) => e['type']=='Technical Evaluation') &&type=='pass'){




// await supabase.from('testrecords').insert({
   
//     'username': data['User'],
//     'supervisor':data['Supervisor'],
//     'type': 'Competency Test',
//     'step': data['Step'],
//     'module':data['Module'],
// })




// }
//     }
const [selectedTrainer, setSelectedTrainer] = useState('Trainer');
    let columns = ['Username', 'Hire Date', 'Module', 'Supervisor', 'Trainer',  'Test Type', 'Step', 'Next Date', '']
return (
<section className="flex justify-center items-center flex-col my-15 mx-10">
    {
   isProcessing &&
      <div className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute bg-black opacity-30 inset-0"></div>
<div  className="bg-red-200 p-5 rounded-xl z-10 overflow-y-auto font-poppins font-bold text-blue-400 text-2xl max-h-100 min-w-1/3 
flex flex-col items-center py-10
justify-center" >
<p className="text-red-500 font-poppins text-3xl">PLEASE WAIT!</p>
<p className="mt-3 text-lg text-gray-900 text-center">The test is being generated.<br></br>Do not exit the tab.</p>

  <div className="flex flex-row gap-5 items-center ">
</div> 
  </div>
  </div>
      }
   {/* {
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
       
    } */}
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
        {/* {
        !hasSupervisor && */}
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
       
{/* } */}
    <select
             onChange={(e) => {setSelectedTrainer(e.target.value)}}
           value={selectedTrainer}
           className="rounded-lg border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-30
        cursor-pointer hover:bg-blue-400/20 hover:border-blue-400 hover:scale-103 transtion-all duration-300 justify-center px-1 overflow-ellipsis
        ">




            <option>
Trainer
</option>
{
Trainers.map((entry) =>
  <option>{entry}</option>
  )




}
        </select>
 <input
 type="date"
 value={maxDate}
        onChange={(e) => {
          let now= new Date;
          now.setDate(now.getDate()+10)
          let eDate = new Date(e.target.value);
if (now >= eDate){
          setMaxDate(e.target.value)
} else {
  setMaxDate(e.target.value)
  // regenData();
}
       
        }}
         className="rounded-lg
       
        border-blue-300  font-normal border-2  text-gray-900 font-poppins py-2 w-35
        cursor-pointer hover:bg-blue-400/20 hover:border-blue-400 hover:scale-103 transtion-all duration-300 justify-center px-1 overflow-ellipsis
        ">




           




        </input>
   




</div>
<div className=" rounded-md mt-7 w-full">
  <div className="flex flex-row bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg py-2    font-bold font-inter">
{
  columns.map((entry) =>
  <div className= {`m-2 ml-5 ${
  entry == 'Test Type' ? 
'w-[10%]' : entry == 'Step' ? 'w-[7%]' : entry == 'Supervisor' ? 'w-[10%]' :
entry == 'User' ? 'w-[10%]' : entry == 'Hire Date' ? 'w-[10%]' :
entry == 'Module' ?'w-[10%]': entry == 'Next Date' ? 'w-[10%]' :  entry == '' ? 'w-[20%]' :
'w-[10%]'
  }`}>
    <p >{entry} </p>
 
  </div>
  )
}
</div>
<div className="flex flex-col font-poppins ">
{
userData.filter((entry) =>{
 
  let entryDate: Date = new Date(entry['Next Date']);
  let maxDates: Date = new Date(maxDate)
  return (testType == 'Test Type' ? true : entry['Test Type'] == testType) &&
 (selectedUser == 'Username' ? true : entry['User'] == selectedUser) && (selectedTrainer == 'Trainer' ? true : entry['Trainer'] == selectedTrainer) &&
 (selectedSupervisor == 'Supervisor' ? true : entry['Supervisor'] == selectedSupervisor) && (
 
  entryDate <= maxDates)
}
 
).map((entry) =>
   <div>
   <div className={`flex flex-row items-center`}>
 {   Object.values(entry).map((entrye: any, i) => {

if (i==10 || i==9 || i==11){
  return;
}
   return (
 
 <div  className= {`ml-5  m-2 py-2 ${entrye == 'PASS' ? 'text-green-500 font-bold' : entrye == 'FAIL' ? 'text-red-500 font-bold' : ''}
    ${
columns[i] == 'Test Type' ?
'w-[10%]' : columns[i] == 'Supervisor' ? 'w-[10%]' :
columns[i] == 'Username' ? 'w-[10%]' : columns[i] == 'Hire Date' ? 'w-[10%]' :
columns[i] == 'Module' ?'w-[10%]': columns[i] == 'Next Date' ? 'w-[10%]' :
columns[i] == 'Step' ? 'w-[7%]' : i ==8 ? 'w-[20%]' :
'w-[10%]'
  }
    `}>
 {
 i == 8?
 entrye == 'no number' || entry['Test Type'] == 'Performance review' ?
 entry['Test Type'] == 'Performance review' && entry['Action'] == 'READY'
 ?
 <div className="flex flex-row gap-3">
<label className= {`
flex flex-row rounded-3xl   p-3 w-35 text-lg items-center justify-center  transition-all
duration-300 ${isUploaded.includes(entry['id']) ? 'bg-green-500' : 'hover:bg-orange-400  bg-orange-300 hover:scale-102 cursor-pointer'} py-2 text-white gap-2  font-poppins `}>
 {isUploaded.includes(entry['id']) ? 'Uploaded' : 'Upload'}
 <input
 onChange={(e) => {
  // setUploadMenu(true);
  if (!isUploaded.includes(entry['id'])){
  handleUpload(e, entry)
  setUploadData(entry);


  }


}}
type="file"
className="hidden"/>
</label>
<button
onClick={() => {


    navigater('/performance-review', {state: [entry['User'], entry['id'],  entry['Step'], 'no path']})
 
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2
text-white gap-2 bg-blue-500 font-poppins">
Print
</button>
</div>
 :
<button
onClick={() => {
  if (entry['Test Type'] == 'Technical Evaluation'){
navigater('/evaluation', {state: [ entry['User'],
'no id', 'no step']})
  } else if (entry['Test Type'] == 'Competency Test') {
generateTest(entry['Step'], entry['Module'], entry['User'], entry['Test Type'], entry);
  } else{
   
    navigater('/performance-review', {state: [entry['User'], null,  entry['Step'], 'no path']})
  }
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2
text-white gap-2 bg-blue-500 font-poppins">
{entry['Test Type'] == 'Technical Evaluation' ? 'Start' : entry['Test Type'] == 'Competency Test' ? 'Generate' : 'Start'}
</button>
:<p className="font-extrabold text-blue-500 ml-5 ">Code: {entrye}</p>
// : <div className="flex flex-row gap-4"><p className="font-extrabold text-blue-500 ml-5 ">Code: {entrye}</p>
// <div
// onClick={() => regenTest(entrye)}
// title="Regenerate" className={`w-min cursor-pointer
// ${ regenIds.includes(entrye) ? 'text-green-500 scale-105': 'hover:text-blue-400  hover:scale-104'}
//   transition-all`}><RefreshCcw></RefreshCcw></div>
// </div>
:i == 1 || i==7? <p>{getDates(entrye )}</p> :<p>{entrye}</p>
 
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









