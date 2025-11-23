import {  useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
const Evaluation = () => {
    const topBar = ['Name:', 'Supervisor:', 'Module:', 'Date:', 'Machine:', 'Trainer:', 'Step:']
    const labels = ['Section', 'Topic', 'Score (1-4)'];
    const location = useLocation();
    const navigate = useNavigate();
    const [name, id] = location.state ?? ['no name', 'no id'];
      const [rawData, setRawDate] = useState([]);
      const [savedAnswers, setSavedAnswers] = useState<Record<any, any>>({});
    const [sectionsData, setSectionData] =useState([]);
async function formatData (usersdata: any){
    
let data: any = 
await supabase.from('technical').select().eq('module', usersdata[0]['module']).eq('step', usersdata[0]['actualstep'])
;
if (id != 'no id'){
   
  let hihi: any =  await  supabase.from('savedtest').select().eq('module', usersdata[0]['module']).eq('step', usersdata[0]['actualstep']).eq('controlnbr', id).eq('username', usersdata[0]['username']);
    // setTextMap(
    console.log('fff', hihi, id)
      hihi=  hihi.data?.map((e: any) => {
        console.log('dataa', data, e['id'])
         let lool = data.data.find((e1:any) => e1['id'] == e['techid'])
         console.log('lool', lool)
         return {[lool['topic']]:e['techanswer']
         }
        
        });
        setSavedAnswers(Object.assign({}, ...hihi));
    console.log('ghhh', hihi);
    // )
}

setRawDate(data.data);
let masterList: any = [];
let sectionData: any =[];
for (const entry of data.data!){
if (!masterList.includes(entry['section'])){
masterList.push(entry['section'])
}
}
for (const entry of masterList){
    let list2: any =   data.data!.filter((e: any) => e['section'] == entry);
    sectionData.push({'label':entry, 'topics':list2.map((e:any) => e['topic'])});
   

}
setSectionData(sectionData)
    }
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
async function completeEvaluation(){
    
let responseList = Object.values(textMap).map((e) => e)
let totalsum = 0;
for (const item of responseList){
    totalsum = totalsum+Number(item);
}
let date = new Date();

let avg = (Math.round(totalsum/responseList.length * 10)/10);
   let fetchcontrolnbr: any = await supabase.from('testrecords').select().eq('step', userData2[0]['actualstep']).eq('module', userData2[0]['module']).eq('username',  userData2[0]['username']).
     eq('type', 'Technical Evaluation').is('result', null)
  
for (const item of rawData){
  
await supabase.from('savedtest').insert({
    'techid':item['id'],
    'techanswer': textMap[item['topic']],
    'username': userData2[0]['username'],
   'controlnbr':fetchcontrolnbr.data[0]['id'],
    'module': userData2[0]['module'],
    'step':userData2[0]['actualstep']
 

 })
}

await supabase.from('testrecords').update({
    'score':avg,
    'result': avg >= 3 ? 'PASS' : 'FAIL',
    'username': userData2[0]['username'],
    'supervisor':userData2[0]['supervisor'],
    'type': 'Technical Evaluation',
    'date': date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        }),
    'module': userData2[0]['module'],
    'step':userData2[0]['actualstep']
}).eq('id', fetchcontrolnbr.data[0]['id']);
if (avg < 3){
 await supabase.from('testrecords').insert({
   
    'username': userData2[0]['username'],
    'supervisor':userData2[0]['supervisor'],
    'type': 'Technical Evaluation',
 
    'module': userData2[0]['module'],
    'step':userData2[0]['actualstep']
}); 
}
let stuoidlist: any = await supabase.from('testrecords').select().eq('module', userData2[0]['module']).eq('step', userData2[0]['actualstep']).eq('username', userData2[0]['username'])
.eq('supervisor', userData2[0]['supervisor']).eq('result', 'PASS');
const list = ['Technical Evaluation', 'Competency Test', 'Performance teview']
if (stuoidlist.data.length >= 3 && stuoidlist.data.map((e: any) => e['type']).includes(list)){
    await supabase.from('users').update({
          'actualstep': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' : 
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
  'nextdate': getNextDate(userData2[0]['hiredate'], stuoidlist.data[0]['step']  )
 } ).eq('username', userData2[0]['username']);

for (const item of list){

await supabase.from('testrecords').insert({
   
    'username': userData2[0]['username'],
    'supervisor':userData2[0]['supervisor'],
    'type': item,
    'step': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' : 
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
    'module': userData2[0]['module'],
})
}
}

}
const [userData, setUserData] = useState([]);
const [textMap, setTextMap] = useState({});
const [userData2, setUserData2] = useState([]);
const [selectedUser, setSelectedUser] = useState('');
async function loadData(){
     let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('users').select().eq('uid', session.data.session?.user.id);

let userData: any = userData1.data[0]['role'] == 'SUPERVISOR' ? await supabase.from('users').select().eq('supervisor', userData1.data[0]['username'])

    : await supabase.from('users').select().eq('role', "USER")
console.log('use', userData);
setUserData(userData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
if (name != 'no name'){
    formatData(userData.data.filter((e: any)=> e['username'] == name))
    setSelectedUser(name);
    setUserData2(userData.data.filter((e: any)=> e['username'] == name))
}
}
useEffect(()=>{
    console.log('locc', location)
loadData();
}, []);
const  date = new Date(); 
    return (
<section className="mx-15 flex flex-col mt-15">
     { name != 'no name' ?
    <div className="flex flex-row justify-between">
       
        <p onClick={() => {
   const loc = location as unknown as {key?:string};
    loc.key != 'default'  ? navigate(-1) : navigate('/')}} className="gap-2 font-inter text-lg items-center
 cursor-pointer hover:text-blue-600 flex flex-row w-min"> <ArrowLeft></ArrowLeft> Back  </p>
     {
        id == 'no id' &&
    <button
onClick={() => {
completeEvaluation();
}}
className="
flex flex-row rounded-3xl  self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-2 px-2 mr-5 scale-104
text-white gap-2 bg-blue-500 font-poppins">
Complete
</button> 
     }
</div> :  <button
onClick={() => {
    if (Object.keys(textMap).length == rawData.length){
    completeEvaluation();
   
} }
} 
className="
flex flex-row rounded-3xl  self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-2 px-2 mr-5 scale-104
text-white gap-2 bg-blue-500 font-poppins">
Complete
</button>
  }

<div className="border-blue-500 rounded-t-xl  border-2 p-2 flex justify-center mt-6  flex-col">
       <h1 className="font-poppins text-blue-500 font-bold text-5xl self-center mt-1 mb-1">Technical Evaluation</h1>
    <div className="grid grid-cols-2 w-full px-40 gap-y-5 pt-4 pb-4 ">
{
    topBar.map((e, i) =>
    <div 
        className={`font-poppins flex flex-row ${i == 0 || i ==2 || i==4 || i==6 ? "justify-self-start" : "justify-self-end"}`}>
            {e} 
            { e != 'Name' &&
            <p className="ml-2"> {    e == 'Step:' ? (userData2.length == 0 ? '' : userData2[0]['actualstep']) : e == 'Supervisor:' ? (userData2.length == 0 ? '' : userData2[0]['supervisor']) : 
            e == 'Module:' ?(userData2.length == 0 ? '' :userData2[0]['module']) : e=='Machine:' ? ( userData2.length == 0 ? '' : userData2[0]['machine']) :
        e == 'Date:' ?   `${date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        })}`:  '' }</p>
}
            {
                e == 'Name:'  && (
                name != 'no name' ? <p className="ml-2">{name}</p> :
             <select 
 value={selectedUser}
  onChange={(er)=> {
    setSelectedUser(er.target.value)
    setUserData2(userData.filter((entry) => entry['username'] == er.target.value))

    formatData(userData.filter((entry) => entry['username'] == er.target.value));
  }}
   className='border-2 ml-3 rounded-md  border-blue-400 p-2 
 font-poppins'>
   <option>Select a user...</option>
  {
userData.map((entry) =>  
  <option>{entry['username']}</option>
)
}
 </select>  
           ) }
            </div>
    )
}

</div>

</div>
<div className="border-x-blue-500  border-b-blue-500  border-x-2 border-b-2 p-2  font-poppins ">
<p> The following information is an assessment of the employee capacity to demonstrate area knowledge on a timely manner. The 30-90-180 day training cycle requires the
coating operator to be assessed on current abilities performance and completion of required task. The scores are rated in observation for: <span className="text-red-500 font-bold ">Demonstrated skills sets in
completing the task Safely, with Quality detail, acceptable Process- Machine understanding and executed on a Timely manner.</span> Audit 4 = Excellent (ANSWERED 100% of the
Topic), Audit 3 = Good (ANSWERED up to 75% of the Topic), Audit 2 = Need assistance (ANSWERED up to 50% of the Topic ), Audit 1 = under the expected level (ANSWERED below than 49% of the Topic)
</p>

</div>
<div className="border-x-blue-500 bg-blue-50 border-b-blue-500 flex flex-row border-x-2 border-b-2   font-poppins justify-center">
{
    labels.map((e,i) =>
        <div className={` flex flex-row justify-center
    ${e == 'Section' ? 'w-[20%]':
e == 'Topic' ?'w-[70%]'
 : 'w-[10%]'
}
`}>
    
    <p className={`font-poppins text-blue-400 font-bold
   p-2
`} >{e} </p>
<div className="flex-1"></div>
{ i != 2 &&
 <span className="inline-block w-0.5 h-full bg-blue-500 ml-2"></span>
}
</div>
    )
}


</div>
<div className="flex flex-col mb-10 "



>
{
    sectionsData.map((e: any,i) =>
    <div className="flex flex-row ">
<div className={`w-[20%] p-1 items-center flex justify-center 
font-poppins font-bold  text-2xl border-x-2 border-x-blue-500 
${i == 0 ? 'bg-red-500 border-t-blue-500 border-1' : i == 1 ? 'bg-blue-400' :i==2 ?
'bg-gray-400 ' : i==3 ? 'bg-yellow-300' : i==sectionsData.length-1 ? 'bg-blue-200 border-b-blue-500 border-b-2 rounded-bl-xl' : 'bg-green-300'
}` }>
    {e['label']}
</div >
<div className="flex flex-col w-[80%]">
{
    e['topics'].map((topic: string, i2:any) =>
        <div className="flex flex-row">
       <div className={`border-y-blue-500 w-[94%] border-r-blue-500 p-2 font-poppins border-t-1 border-r-2
       ${topic== 'Process of adding Oil' ? 'border-b-2 ' : 'border-b-2'}
       `}>

        {topic}
       </div >
       <div className="w-[13.5%]">
        { 
        id == 'no id' ?
        <input
          maxLength={1}
          onChange={(er) => {
            setTextMap({...textMap, [topic]:er.target.value })
          }}
          onKeyDown={(e) => {
            if (!['1','2','3','4', 'Backspace'].includes(e.key)){
                e.preventDefault();
            }
          }}
          className={`border-y-blue-500 border-r-blue-500 p-2 font-poppins border-t-1 border-r-2  w-full h-full
       border-b-2`}
        
        >


    
       </input>

       : <div
       onClick={()=>{
        console.log('liar', topic, savedAnswers, savedAnswers[topic])
       }}
          className={`border-y-blue-500 border-r-blue-500 p-2 font-poppins border-t-1 border-r-2  w-full h-full
       border-b-2`}
       >{savedAnswers[topic]}</div>
}
       </div>
       </div>
    )
}
{/* <div className="flex flex-col w-[25%]">
{
    e.topics.map((e) =>
       <input className={`border-y-blue-500 border-r-blue-500 p-2 font-poppins border-t-1 border-r-2
       
        ${e== 'Process of adding Oil' ? 'border-b-2' : 'border-b-1'}`}>

    
       </input>
    )
}
</div> */}
</div>

    </div>
    )
}
</div>

</section>

    );
}

export default Evaluation;