import {  useEffect, useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
const PerformanceReview = () => {
     const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
   documentTitle: 'Performance Review',
   contentRef: printRef,

  });

    const topBar = ['Name:', 'Supervisor:', 'Module:', 'Date:', 'Machine:', 'Trainer:', 'Step:', ]
    const labels = ['Test Type', 'Score', 'Result'];
    const col2 = ['Topic', 'Yes', 'No'];
    const sectionData = [
        {
            'cat':'Job Knowledge - Technical Skills (competencies)',
            'questions': ['Shows progression in knowledge of basic tasks',
'Hands on activities with job tasks',
'Shows interest in demonstrating learnings']
        }
        ,
                {
            'cat':'Customer Response  (competencies)',
            'questions': ['Engaged in achieving task goals',
'Responds well to trainers direction',
'Good attendance, at work on time' ]
        },
           {
            'cat':'Communication & Teamwork  (competencies)',
            'questions': [
                'Positive attitude',
'Interacts with coworkers calmly and professional',
'Exhibits a team mentality'
             ]
        },
           {
            'cat':'Initiative  (competencies)',
            'questions': [
                'Seeks a commitment to enhance learnings',
'Willingness to an open minded method ',
'Engaged to an independent knowledge building'
             ]
        },
           {
            'cat':'Quality of Work  (competencies)',
            'questions': [
               'Attentive to details',
'Aptitude of Product Quality Defect knowledge',
'Recognizes and learns from mistakes'
             ]
        },
        {
            'cat':'',
            'questions':[
                'Attentive to details',
'Aptitude of Product Quality Defect knowledge',
'Recognizes and learns from mistakes'
            ]

        },
         {
            'cat':'',
            'questions':[
              'Overall Status',
'Attendance Points',
'Disciplinary Actions'
            ]

        },

    ]
    const row1 = ['Technical evaluation', '', ''];
    const row2 =['Competency Test', '', ''];
    const location = useLocation();
    const navigate = useNavigate();
    const [name, id, file] = location.state ?? ['no name', 'no id', 'no path'];
      const [rawData, setRawDate] = useState([]);
      const [savedAnswers, setSavedAnswers] = useState<Record<any, any>>({});
    const [sectionsData, setSectionData] =useState([]);
async function formatData (usersdata: any){
    
let data: any = 
await supabase.from('testrecords').select().eq('module', usersdata[0]['module']).eq('step', usersdata[0]['actualstep']).eq('username', userData2[0]['username'])
;


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
for (const item of rawData){
     let fetchcontrolnbr: any = await supabase.from('testrecords').select().eq('step', userData2[0]['actualstep']).eq('module', userData2[0]['module']).eq('username',  userData2[0]['username']).
     eq('type', 'Technical Evaluation').is('result', null)
await supabase.from('savedtest').insert({
    'techid':item['id'],
    'techanswer': textMap[item['topic']],
    'username': userData2[0]['username'],
   'controlnbr':fetchcontrolnbr[0]['id'],
    'module': userData2[0]['module'],
    'step':userData2[0]['actualstep']
 

 })
}

await supabase.from('testrecords').upsert({
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
}).eq('module', userData2[0]['module']).eq('step', userData2[0]['actualstep']).eq('username', userData2[0]['username']).eq('type', 'Technical Evaluation').is('result', null)
.eq('supervisor', userData2[0]['supervisor']);
let stuoidlist: any = await supabase.from('testrecords').select().eq('module', userData2[0]['module']).eq('step', userData2[0]['actualstep']).eq('username', userData2[0]['username'])
.eq('supervisor', userData2[0]['supervisor']).eq('result', 'PASS');
const list = ['Technical Evaluation', 'Competency Test', 'Performance Review']
if (stuoidlist.data.length >= 3){
    await supabase.from('users').update({
          'actualstep': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' : 
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
  'nextdate': getNextDate(userData2[0]['hiredate'], stuoidlist.data[0]['step']  )
 } );

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
const [resultData, setResultData] = useState([]);
async function testData(userdata: any) {
    console.log('uuu', userdata)
  let data: any =  await supabase.from('testrecords').select().eq('module', userdata[0]['module']).eq('step', userdata[0]['actualstep']).eq('username', userdata[0]['username'])
;


setRawDate(data.data.filter((e: any) => e['type'] == 'Technical Evaluation'));
setResultData(data.data.filter((e: any) => e['type'] == 'Competency Test'))
console.log('dddd', data)
console.log(';ggggg', rawData, resultData)

    
}
async function loadData(){
     let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('users').select().eq('uid', session.data.session?.user.id);

let userData: any = userData1.data[0]['role'] == 'SUPERVISOR' ? await supabase.from('users').select().eq('supervisor', userData1.data[0]['username'])

    : await supabase.from('users').select().eq('role','USER')
setUserData(userData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
if (name != 'no name'){
    formatData(userData.data.filter((e: any)=> e['username'] == name))
    setSelectedUser(name);
    setUserData2(userData.data.filter((e: any)=> e['username'] == name))
}
}
useEffect(()=>{
console.log('fileee', file)
loadData();
}, []);
const  date = new Date(); 
    return (
         file != 'no path' ? 
         <div>
        <object data={file}   type="application/pdf"
  width="100%"
  height="600px"></object>
        </div>
        :
<section className="flex flex-col mt-15">
     { name != 'no name' ?
    <div className="flex flex-row justify-between">
       
        <p onClick={() => {
   const loc = location as unknown as {key?:string};
    loc.key != 'default'  ? navigate(-1) : navigate('/')}} className="gap-2 ml-15 font-inter text-lg items-center
 cursor-pointer hover:text-blue-600 flex flex-row w-min"> <ArrowLeft></ArrowLeft> Back  </p>
     {
        id == 'no id' &&
    <button
onClick={() => {
handlePrint();
}}
className="mr-15
flex flex-row rounded-3xl  self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-2 px-2 mr-5 scale-104
text-white gap-2 bg-blue-500 font-poppins">
Print
</button> 
     }
</div> :  <button
onClick={() => {
 handlePrint(); }
} 
className="
flex flex-row rounded-3xl mr-15 self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-2 px-2 mr-5 scale-104
text-white gap-2 bg-blue-500 font-poppins">
Print
</button>
  }
<div ref={printRef} className="mx-15">
<div   className="border-blue-500 rounded-t-xl  border-2 p-2 flex justify-center mt-6  flex-col">
    <h1 className="font-poppins text-blue-500 font-bold text-5xl self-center mt-1 mb-1">Performance Review</h1>
    <div className="grid grid-cols-2 grid-rows-4 w-full px-40 gap-y-5 pt-4 pb-4 ">
{
    topBar.map((e, i) =>
    <div 
        className={`font-poppins flex flex-row ${i == 0 || i ==2 || i==4 || i==6? "justify-self-start" : "justify-self-end"}`}>
            {e} 
            { e != 'Name' &&
            <p className="ml-2"> { 
                e == 'Step:' ? (userData2.length == 0 ? '' : userData2[0]['actualstep']) : 
                e == 'Supervisor:' ? (userData2.length == 0 ? '' : userData2[0]['supervisor']) : 
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
testData(userData.filter((entry) => entry['username'] == er.target.value));
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
<div className="flex flex-col">
<div className="border-x-blue-500 bg-blue-50 border-b-blue-500 flex flex-row border-x-2 border-b-2   font-poppins justify-center">
{
    labels.map((e,i) =>
        <div className={` flex flex-row justify-center
    ${e == 'Test Type' ? 'w-[80%]':
'w-[10%]'
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
<div className="border-x-blue-500  border-b-blue-500 flex flex-row border-x-2 border-b-2   font-poppins justify-center">
{
   row1.map((e,i) =>
        <div className={` flex flex-row justify-center
    ${e == 'Technical evaluation' ? 'w-[80%]':
'w-[10%]'
}
`}>
    
    <p className={`font-poppins text-gray-900
   p-2 ${ i ==2 && rawData.length != 0  ?  rawData[0]['result'] == 'PASS' ? 'text-green-500 font-bold' : rawData[0]['result'] == 'FAIL' ? 'text-red-500 font-bold'
     : '': ''}
`} >{i== 1 ? rawData.length == 0 ? '' : rawData[0]['score'] : i== 2 ? rawData.length == 0 ? '' : rawData[0]['result'] :    e} </p>
<div className="flex-1"></div>
{ i != 2 &&
 <span className="inline-block w-0.5 h-full bg-blue-500 ml-2"></span>
}
</div>
    )
}

</div>
<div className="border-x-blue-500  border-b-blue-500 flex flex-row border-x-2 border-b-2   font-poppins justify-center">
{
   row2.map((e,i) =>
        <div className={` flex flex-row justify-center
    ${e == 'Competency Test' ? 'w-[80%]':
'w-[10%]'
}
`}>
    
    <p className={`font-poppins text-gray-900
   p-2 ${ i ==2 && rawData.length != 0  ?  resultData[0]['result'] == 'PASS' ? 'text-green-500 font-bold' : resultData[0]['result'] == 'FAIL' ? 'text-red-500 font-bold'
     : '': ''}
`} >{i== 1 ? resultData.length == 0 ? '' : resultData[0]['score'] : i== 2 ? resultData.length == 0 ? '' : resultData[0]['result'] :    e}</p>
<div className="flex-1"></div>
{ i != 2 &&
 <span className="inline-block w-0.5 h-full bg-blue-500 ml-2"></span>
}
</div>
    )
}

</div>
<div className="border-x-blue-500 bg-blue-400 border-blue-500  flex flex-row border-x-2 border-2   font-poppins justify-center">
{
   col2.map((e,i) =>
        <div className={` flex flex-row justify-center
    ${e == 'Topic' ? 'w-[80%]':
'w-[10%]'
}
`}>
    
    <p className={`font-poppins text-white font-bold
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
</div>
<div className="flex flex-col mb-10 "



>
{
    sectionData.map((e: any,i) =>
    <div className="flex flex-col ">
<div className={`w-full p-1.5 items-center flex justify-center 
font-poppins font-bold  text-xl border-1 py-2 border-blue-500 
bg-blue-300 text-blue-500 ${i==sectionData.length-1 ? 'bg-blue-600' : ''}` }>
    {e['cat']}
</div >
<div className="flex flex-col w-full">
{
    e['questions'].map((topic: string, i2:any) =>
        <div className="flex flex-row">
       <div className={`border-y-blue-500 border-l-blue-500 border-l-2 w-[80%] border-r-blue-500 p-2 font-poppins border-t-1 border-r-2
       ${topic== 'Process of adding Oil' ? 'border-b-2 ' : 'border-b-2'}
       `}>

        {topic}
       </div >
       <div className="w-[10%]">
        { 
       
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

       
}
       </div>
         <div className="w-[10%]">
        { 
       
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
<div className="border-blue-500 border-2 py-3 mb-10 rounded-md">
    <div className="border-b-blue-500 border-b-2 flex items-center justify-center font-poppins font-bold pb-3 ">
        Comments and Observations
    </div>
    <div className="w-full h-50 px-3"></div>

</div>
<div className="flex flex-col mb-10 gap-5 font-poppins">
<p>Manager/Supervisor</p>
<p>Date</p>
<div className="bg-blue-400 w-full h-1 rounded-xl"></div>
<p>Employee on Training</p>
<p>Date</p>
</div>
</div>
</section>

    );
}

export default PerformanceReview;