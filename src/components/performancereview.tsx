import {  useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { supabase } from "../supabaseClient";
const PerformanceReview = () => {
    const [isLoading, setIsLoading] = useState(false);
     const printRef = useRef<HTMLDivElement>(null);


  const handlePrint = useReactToPrint({
   documentTitle: 'Performance Review',
   contentRef: printRef,


  });


    const topBar = ['Name:', 'Supervisor:', 'Module:', 'Date:', 'Machine:', 'Trainer:', 'Step:', ]
    const labels = ['Test Type', 'Score', 'Result'];
    const [comment, setComment] = useState('');
    const col2 = ['Topic', 'Ready', 'Not Ready'];
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
//         {
//             'cat':'',
//             'questions':[
//                 'Attentive to details',
// 'Aptitude of Product Quality Defect knowledge',
// 'Recognizes and learns from mistakes'
//             ]


//         },
         {
            'cat':'',
            'questions':[
              'Overall Status',
'Attendance Points',
'Disciplinary Actions'
            ]


        },


    ]
    const qs = ['Shows progression in knowledge of basic tasks',
'Hands on activities with job tasks',
'Shows interest in demonstrating learnings',  'Engaged in achieving task goals',
'Responds well to trainers direction',
'Good attendance, at work on time' ,  'Positive attitude',
'Interacts with coworkers calmly and professional',
'Exhibits a team mentality',     'Seeks a commitment to enhance learnings',
'Willingness to an open minded method ',
'Engaged to an independent knowledge building',   'Attentive to details',
'Aptitude of Product Quality Defect knowledge',
'Recognizes and learns from mistakes',   'Overall Status',
'Attendance Points',
'Disciplinary Actions' ]
    const row1 = ['Technical evaluation', '', ''];
    const row2 =['Competency Test', '', ''];
    const location = useLocation();
    const [chosen, setChosen] = useState('');
       async function handlePassFail(data: any, type: any){
        setIsLoading(true);
   let date = new Date();
 
    let fetchcontrolnbr: any = await supabase.from('testrecords').select()
    .eq('step', step != 'no step'  && step != null ? step : userData2[0]['actualstep']).eq('module', userData2[0]['module']).eq('username',  userData2[0]['username']).
     eq('type', 'Performance review').is('result', null)
 
   for (const item of qs){
   
  const {error, status} = await supabase.from('savedtest').insert({
    'performid':item,
    'perfomanser': textMap[item],
    'username': userData2[0]['username'],
    'supervisor':userData2[0]['supervisor'],
    'trainer':userData2[0]['trainer'],
   'controlnbr':fetchcontrolnbr.data[0]['id'],
    'module': userData2[0]['module'],
    'step':step != 'no step' && step != null ? step : userData2[0]['actualstep']




 })
 console.log('Qs insert:', error, status);
}


const {status} = await supabase.from('savedtest').insert({
 
    'username': userData2[0]['username'],
       'supervisor':userData2[0]['supervisor'],
    'trainer':userData2[0]['trainer'],
   'controlnbr':fetchcontrolnbr.data[0]['id'],
    'module': userData2[0]['module'],
    'step':step != 'no step' && step != null ? step : userData2[0]['actualstep'],
 'comment':comment


 })
 console.log('status:', status)
  const {error, } = await supabase.from('testrecords').update({
       'doneby':trainername,
        'username':data['username'],
        'date': date.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'2-digit',
        }),
        'module':data['module'],
    'supervisor': data['supervisor'],
        'type':'Performance review',


      'score': type == 'pass' ? 'OK':'NOT READY',
        'result': type == 'pass' ? 'READY' : 'NOT READY',
     
       
    }).eq('id', fetchcontrolnbr.data[0]['id'])
    console.log('testrecords update:', error, )
    if (type == 'fail'){
        let date: Date =new  Date();
          let insert = date.setDate(date.getDate()+30)
  await supabase.from('testrecords').insert({
   
    'trainer': data[0]['trainer'],
    'supervisor':data[0]['supervisor'],
     'username': data[0]['username'],
    'type': 'Performance review',
  'nextdate':date,
    'module': data[0]['module'],
    'step':step != 'no step' && step != null ? step : userData2[0]['actualstep']
});
    }
   
let stuoidlist: any = await supabase.from('testrecords').select().eq('module', data[0]['module']).eq('step',data[0]['actualstep']).eq('username', data[0]['username'])
.eq('supervisor', data[0]['supervisor']).eq('result', 'READY');


if (stuoidlist.data.length >= 2 && type=='pass'){
 let date: Date =new  Date(data[0]['nextdate'])


await supabase.from('testrecords').insert({
   
    'username': data[0]['username'],
     'trainer': data[0]['trainer'],
    'supervisor':data[0]['supervisor'],
    'type': 'Competency Test',
'nextdate': date,
    'step': data[0]['actualstep'],
    'module':data[0]['module'],
})


}
setIsLoading(false);
    }
    const [name, id, step, file] = location.state ?? ['no name', 'no id', 'no step', 'no path'];
      const [rawData, setRawDate] = useState([]);
    const [sectionsData, setSectionData] =useState([]);
async function formatData (usersdata: any){
   
let data: any =
await supabase.from('testrecords').select().eq('module', usersdata[0]['module']).eq('step',
    step != null && step != 'no step' ? step :
    usersdata[0]['actualstep']).eq('username', usersdata[0]['username'])
;






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
   


const [userData, setUserData] = useState([]);
const [isComplete, setIsComplete] = useState(false);
const [textMap, setTextMap] = useState<Record<any, any>>({});
const [userData2, setUserData2] = useState([]);
const [selectedUser, setSelectedUser] = useState('');
const [trainername, setTrainerName] = useState('');


const [resultData, setResultData] = useState([]);
async function testData(userdata: any) {
  let data: any =  await supabase.from('testrecords').select().eq('module', userdata[0]['module']).eq('step',
   
    step != null && step != 'no step' ? step :
    userdata[0]['actualstep']).eq('username', userdata[0]['username'])
;




setRawDate(data.data.filter((e: any) => e['type'] == 'Technical Evaluation' && e['result'] == 'READY').length != 0 ? 
data.data.filter((e: any) => e['type'] == 'Technical Evaluation' && e['result'] == 'READY') : data.data.filter((e: any) => e['type'] == 'Technical Evaluation' && e['result'] == 'NOT READY')
);
setResultData(data.data.filter((e: any) => e['type'] == 'Competency Test' && e['result'] == 'PASS').length != 0 ? data.data.filter((e: any) => e['type'] == 'Competency Test' && e['result'] == 'PASS') 

: data.data.filter((e: any) => e['type'] == 'Competency Test' && e['result'] == 'FAIL'))




   
}
async function checkIfExist(userdata: any){
   let idk2= await supabase.from('testrecords').select().eq('module', userdata[0]['module']).eq('step',
    step == 'no step' ?
    userdata[0]['actualstep'] : step).eq('username', userdata[0]['username'])
 
.eq('type', 'Performance review').eq('result', 'READY');


if (idk2.data?.length != 0 && idk2.data != null){
    let dat2 = idk2.data![0];
let getdata = await supabase.from('savedtest').select().eq('controlnbr', dat2['id'] );


let cmt = getdata.data!;
 let cmnt = cmt.find((e) => e['comment'] != null);


 setComment(cmnt['comment'] ??'')
 let textymap = getdata.data!.map((e,) => ({
 [e.performid]:e.perfomanser
}));
 setTextMap(Object.assign({}, ...textymap));
 
setIsComplete(true);
} else {
    setIsComplete(false)
}


}
async function loadData(){
    console.log('file', file)
     let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);
setTrainerName(userData1.data[0]['username'])
let userData: any =
// userData1.data[0]['role'] == 'SUPERVISOR' ? await supabase.from('users').select().eq('supervisor', userData1.data[0]['username'])


//     :
     await supabase.from('users').select().eq('role', 'USER').eq('active', 'Y')
 
setUserData(userData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
if (name != 'no name'){
    formatData(userData.data.filter((e: any)=> e['username'] == name))
    setSelectedUser(name);
    setUserData2(userData.data.filter((e: any)=> e['username'] == name))
   
testData(userData.data.filter((entry: any) => entry['username'] ==name));


checkIfExist(userData.data.filter((entry: any) => entry['username'] ==name));


}
}
useEffect(()=>{
loadData();
}, []);
const  date = new Date();
    return (
         file != 'no path'  ?
         <div>
        <object data={file}   type="application/pdf"
  width="100%"
  height="600px"></object>
        </div>
        :
<section className="flex flex-col mt-15">
      <div className="flex flex-row self-end">
    {
    !isComplete && selectedUser != '' &&
    <div className="flex flex-row">
   {
    (chosen == '' || chosen == 'true') &&
    <button
onClick={() => {
     if (Object.keys(textMap).length == qs.length){
     
 handlePassFail(userData2, 'pass')
setChosen('true');
}
     }
}
className="
flex flex-row rounded-3xl mr-5 self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-green-600 py-2 px-2  scale-104
text-white gap-2 bg-green-500 font-poppins">
 { isLoading ?     
  <TailSpin
  height={25} width={25} 
  color="white" ></TailSpin> :
  'Ready' }

</button>
}
{
     (chosen == '' || chosen == 'false') &&
  <button
onClick={() => {
     if (Object.keys(textMap).length == qs.length){
 handlePassFail(userData2, 'fail')
setChosen('false')
}
     }
}
className="
flex flex-row rounded-3xl mr-5 self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-red-600 py-2 px-2  scale-104
text-white gap-2 bg-red-500 font-poppins">
 { isLoading ?     
  <TailSpin
  height={25} width={25} 
  color="white" ></TailSpin> :
  'Not Ready' }


</button>
}
</div>
}
  <button
onClick={() => {
 
 handlePrint();
}
}
className="
flex flex-row rounded-3xl mr-15 self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-2 px-2  scale-104
text-white gap-2 bg-blue-500 font-poppins">
Print
</button>
</div>
 
<div ref={printRef} className="mx-15 mt-13 print:block">
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
                e == 'Step:' ? (userData2.length == 0 ? '' : step == 'no step' ? userData2[0]['actualstep'] : step) :
                e == 'Supervisor:' ? (userData2.length == 0 ? '' : userData2[0]['supervisor']) :
            e == 'Module:' ?(userData2.length == 0 ? '' :userData2[0]['module']) : e=='Machine:' ? ( userData2.length == 0 ? '' : userData2[0]['machine']) :
        e == 'Date:' ?   `${date.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'2-digit',
        })}`: e == 'Trainer:' ? userData2.length == 0 ? '' : userData2[0]['trainer']: '' }</p>
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
checkIfExist(userData.filter((entry) => entry['username'] == er.target.value));
setChosen('');
setTextMap({});
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
   p-2 ${ i ==2 && rawData.length != 0  ?  rawData[0]['result'] == 'READY'  ? 'text-green-500 font-bold' : rawData[0]['result'] == 'NOT READY' ? 'text-red-500 font-bold'
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
   p-2 ${ i ==2 && rawData.length != 0 && resultData.length != 0  ?  resultData[0]['result'] == 'PASS' ? 'text-green-500 font-bold' : resultData[0]['result'] == 'NOT READY' ? 'text-red-500 font-bold'
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
font-poppins font-bold  text-xl border-1 py-2 border-blue-500   ${ i ==4 ? 'print:mt-40'
        : '' }
bg-blue-300 text-blue-500 ${i==sectionData.length-1 ? 'bg-blue-600' : ''}` }>
    {e['cat']}
</div >
<div className="flex flex-col w-full">
{
    e['questions'].map((topic: any, i2:any) =>
        <div className={`flex flex-row`}>
       <div className={`border-y-blue-500  border-l-blue-500 border-l-2 w-[80%] border-r-blue-500 p-2 font-poppins border-t-1 border-r-2
       ${topic== 'Process of adding Oil' ? 'border-b-2 ' : 'border-b-2'}
       `}>


        {topic}
       </div >
       <div className="w-[10%]">
        {
       
        <button
       
          onClick={() => {
            setTextMap({...textMap, [topic]:'Ready' })
          }}
         
          className={`border-y-blue-500 cursor-pointer border-r-blue-500 p-2
             ${textMap[topic] == 'Ready' ? 'bg-blue-400' : ''}
            font-poppins border-t-1 border-r-2  w-full h-full
       border-b-2`}
       
        >




   
       </button>


       
}
       </div>
         <div className="w-[10%]">
        {
       
        <button
       
          onClick={() => {
            setTextMap({...textMap, [topic]:'Not Ready'})
          }}
         
          className={`border-y-blue-500  cursor-pointer border-r-blue-500 p-2
            ${textMap[topic] == 'Not Ready' ? 'bg-blue-400' : ''} font-poppins border-t-1 border-r-2  w-full h-full
       border-b-2`}
       
        >
</button>


       
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
<div className="border-blue-500 border-2  mb-10 rounded-md">
    <div className="border-b-blue-500 border-b-2 flex items-center justify-center font-poppins font-bold pb-3 my-2 ">
        Comments and Observations
    </div>
    <textarea
    value={comment}
    onChange={(e) => {setComment(e.target.value)}}
    className="py-2 w-full h-50 px-3"></textarea>


</div>
<div className="flex flex-col mb-10 gap-5 font-poppins ">
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

