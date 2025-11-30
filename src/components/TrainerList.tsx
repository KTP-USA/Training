import {  useEffect, useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
const TrainerList = () => {
    const topBar = ['Name:', 'Supervisor:', 'Module:', 'Date:', 'Machine:', 'Trainer:', 'Step:']
    const labels = ['Section', 'Topic', 'Trainee', 'Trainer'];
    const location = useLocation();
    const navigate = useNavigate();
         const printRef = useRef<HTMLDivElement>(null);
    
      const handlePrint = useReactToPrint({
       documentTitle: 'Training Topics',
       contentRef: printRef,
    
      });
    const [name, step] = location.state ?? ['no name', 'no step'];
      const [rawData, setRawDate] = useState([]);
      const [savedAnswers, setSavedAnswers] = useState<Record<any, any>>({});
    const [sectionsData, setSectionData] =useState([]);
async function formatData (usersdata: any){
    
let data: any = 
await supabase.from('technical').select().eq('module', usersdata[0]['module']).eq('step', usersdata[0]['actualstep'])
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

const [userData, setUserData] = useState([]);
const [textMap, setTextMap] = useState({});
const [userData2, setUserData2] = useState([]);
const [selectedUser, setSelectedUser] = useState('');
async function loadData(){
     let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);

let userData: any = userData1.data[0]['role'] == 'SUPERVISOR' ? await supabase.from('users').select().eq('supervisor', userData1.data[0]['username'])

    : await supabase.from('users').select().eq('role', 'USER')

setUserData(userData.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
if (name != 'no name'){
    formatData(userData.data.filter((e: any)=> e['username'] == name))
    setSelectedUser(name);
    setUserData2(userData.data.filter((e: any)=> e['username'] == name))
}
}
useEffect(()=>{
loadData();
}, []);
const  date = new Date(); 
    return (
       
<section  

className=" flex flex-col mt-15">
     { name != 'no name' ?
    <div className="flex flex-row justify-between">
       
        <p onClick={() => {
   const loc = location as unknown as {key?:string};
    loc.key != 'default'  ? navigate(-1) : navigate('/')}} className="gap-2 font-inter text-lg items-center ml-15
 cursor-pointer hover:text-blue-600 flex flex-row w-min"> <ArrowLeft></ArrowLeft> Back  </p>
     
    <button
onClick={() => {
handlePrint();
}}
className="
flex flex-row rounded-3xl  self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-2 px-2 mr-15 scale-104
text-white gap-2 bg-blue-500 font-poppins">
Print
</button> 
     
</div> :  <button
onClick={() => {
  
  handlePrint();
   
 }
} 
className="
flex flex-row rounded-3xl  self-end cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-2 px-2 mr-5 scale-104 mr-15
text-white gap-2 bg-blue-500 font-poppins">
Print
</button>
  }
<div ref={printRef} className="mx-15 print:block" >
<div className="border-blue-500 rounded-t-xl  border-2 p-2 flex justify-center mt-6  flex-col">
       <h1 className="font-poppins text-blue-500 font-bold text-5xl self-center mt-1 mb-1">Training Topics</h1>
    <div className="grid grid-cols-2 w-full px-40 gap-y-5 pt-4 pb-4 ">
{
    topBar.map((e, i) =>
    <div 
        className={`font-poppins flex flex-row ${i == 0 || i ==2 || i==4 || i==6 ? "justify-self-start" : "justify-self-end"}`}>
            {e} 
            { e != 'Name' &&
            <p className="ml-2"> {    e == 'Step:' ? (
                step != 'no step'  ? step :
                userData2.length == 0 ? '' : userData2[0]['actualstep']) : e == 'Supervisor:' ? (userData2.length == 0 ? '' : userData2[0]['supervisor']) : 
            e == 'Module:' ?(userData2.length == 0 ? '' :userData2[0]['module']) : e=='Machine:' ? ( userData2.length == 0 ? '' : userData2[0]['machine']) :
        e == 'Date:' ?   `${date.toLocaleDateString('en-US', {
  month:'numeric',
            
day:'2-digit',
year:'2-digit',
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

<div className="border-x-blue-500 bg-blue-50 border-b-blue-500  flex flex-row border-x-2 border-b-2   font-poppins justify-center">
{
    labels.map((e,i) =>
        <div className={` flex flex-row justify-center
    ${e == 'Section' ? 'w-[20%]':
e == 'Topic' ?'w-[60%]'
 : 'w-[10%]'
}
`}>
    
    <p className={`font-poppins text-blue-400 font-bold
   p-2 
`} >{e} </p>
<div className="flex-1"></div>
{ i != 3 &&
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
    <div className="flex flex-row w-full">
<div className={`w-[20%] p-1 items-center flex justify-center 
font-poppins font-bold  text-2xl border-x-2 border-x-blue-500 border-b-blue-500 border-b-2 bg-gray-300 
${ i==sectionsData.length-1 ? '  rounded-bl-xl' : ''
}` }>
    {e['label']}
</div >
<div className="flex flex-col w-[80%]">
{
    e['topics'].map((topic: string, i2:any) =>
        <div className="flex flex-row w-[100%]">
       <div className={`border-y-blue-500 w-[75%] border-r-blue-500 p-2 font-poppins border-t-1 border-r-2
       ${topic== 'Process of adding Oil' ? 'border-b-2 ' : 'border-b-2'}
       `}>

        {topic}
       </div >
       <div className="w-[12.5%]">
        { 
       <div
     
          className={`border-y-blue-500   border-r-blue-500 p-2 font-poppins border-t-1 border-r-2  w-full h-full
       border-b-2`}
       ></div>
}
       </div>
                 <div className="w-[12.5%]">
        { 
       <div
     
          className={`border-y-blue-500 border-r-blue-500 p-2 font-poppins border-t-1 border-r-2  w-full h-full
       border-b-2`}
       ></div>
}
       </div>
       </div>
    )
}

</div>

    </div>
    )
}
</div>
</div>
</section>

    );
}

export default  TrainerList;