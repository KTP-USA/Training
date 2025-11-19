import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {TailSpin} from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {ArrowLeft, ArrowRight, BadgeCheck, AlarmClock} from "lucide-react"
const Test  = () => {


 const [time, setTime] = useState(540);
 const navigate = useNavigate();
 const locs = useLocation();
 const qna = locs.state ?? 'no qna'
 function formatTime(timeString:String){
      function getTime(){
        if    (timeString.length == 2 || timeString.length ==3){
            
            let firstDigit = (Math.round(time/60)).toString();
            
            let mins = Math.abs((time-(Number(firstDigit) * 60)));
          
            return `${firstDigit}:${mins < 10 ? `0${mins}` : mins}`;
            }
        
           else if (timeString.length == 4) {
  let firstDigit = Math.round((time/60)).toString();

    let secondDigit = Math.round((time/60/60)).toString();
            let mins = Math.abs((time-(Number(secondDigit) * 60)));
            return `${firstDigit}:${Number(secondDigit) < 10 ? `0${secondDigit}` : secondDigit}:${mins < 10 ? `0${mins}` : mins}`;
            }
        }
    if (timeString.length == 1){
       
        return `0:0${timeString}`;
    }
return getTime();
 }
const [isLoading, setisLoading] = useState(true);
const [rawList, setRawList] = useState([]);
const {code} =useParams();
// async function addTime(){
// setInterval( () =>{
//     setTime((prev) => prev+1)
// }, 1000)
// }
const [isSubmitted, setIsSubmitted] = useState(false);
async function submitAnswer(){
    let newList: any = rawList.map((e) => {
        return { 'questionid':[e['questionid']], 'correcttest':e['correcttest']};
    
    })
    let correctcount: number = 0;
 for (const item of newList){
    if (questionAndAnswer[item['questionid']] == item['correcttest']){
correctcount= correctcount+1
    }
 }
 let getSupervisor = await supabase.from('users').select().eq('username', rawList[0]['username']);
 let score = (correctcount/rawList.length);
   function getNextDate(date: any, step: String){
 date == new Date(date);
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
 let date = new Date();
  await supabase.from('testrecords').upsert({
        
        'username':rawList[0]['username'],
        'date': date.toLocaleDateString('en-US', {
year:'2-digit',
month:'numeric',
day:'2-digit'
        }),
        'module':rawList[0]['module'],
    'supervisor': getSupervisor.data![0]['supervisor'],
        'score': (score *100),
        'type':'Competency Test',
        'result': score >= 0.8 ? 'PASS' : 'FAIL',
        'controlnbr':code,
        'step':rawList[0]['step'],
        
    }).eq('module', rawList[0]['module']).eq('type', 'Competency Test').eq('step', rawList[0]['step']).eq('username', rawList[0]['username']).eq('supervisor', rawList[0]['step'])
    .is('result', null);
let stuoidlist: any = await supabase.from('testrecords').select().eq('module', rawList[0]['module']).eq('step',rawList[0]['actualstep']).eq('username', rawList[0]['username'])
.eq('supervisor', rawList[0]['supervisor']).eq('result', 'PASS');
const list = ['Technical Evaluation', 'Competency Test', 'Performance Review']
if (stuoidlist.data.length >= 3){
    await supabase.from('users').update({
          'actualstep': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' : 
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
  'nextdate': getNextDate(rawList[0]['hiredate'], stuoidlist.data[0]['step']  )
 } );

for (const item of list){

await supabase.from('testrecords').insert({
   
    'username': rawList[0]['username'],
    'supervisor':rawList[0]['supervisor'],
    'type': item,
    'step': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' : 
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
    'module': rawList[0]['module'],
})
}
}
setIsSubmitted(true);
   
    
}
async function setAnswer(id: any, answer: any, controlnbr: any){
    await supabase.from('savedtest').update({'useranswer':answer}).eq('questionid', id).eq('controlnbr', controlnbr)
}
 useEffect(() => {
    if (qna != 'no qna'){
        console.log('qq', qna)
        setQuestionAndAnswer(qna);
    }
const timer = setInterval( () =>{
    setTime((prev) => prev+1)
}, 1000)
 async function genQBank() { 
  

  let   stupidList:any = await supabase.from('savedtest').select().eq('controlnbr', code ?? 29108)
 setRawList(stupidList.data);
   let   myList:any = await supabase.from('questions').select().eq('module', stupidList.data[0]['module']).eq('step',stupidList.data[0]['step'])
   
     let stupidList3: Array<any> = [];
    for (const entry of stupidList.data){
stupidList3.push(entry['questionid'])
    }

 myList.data =  myList.data.filter((entry: any) => stupidList3.includes(entry['questionid']));
for (const entry of myList.data){
    let itsStupid = stupidList.data.filter((entrye:any) => entrye['questionid'] == entry['questionid'])
    entry['order'] = itsStupid[0]['questiontest'] 
}
myList.data.sort((a: any, b:any) => a['order'] - b['order'])
    console.log(`mylist is `, myList.data)
  
    let masterList: any = []; 
    let qBank: Array<any> = [];
     for (const item of myList.data){
         if (!masterList.includes(item['questionid'])){
             masterList.push(item['questionid']);
             } } 
             for (const item of masterList){ 
  let newList = 
        myList.data.filter((entry: any) => entry['optiontext'] != '' && entry['questionid'] == item);
   let options: any = []; 
     for (const entry of newList){
      options.push({optiontext: entry['optiontext'], 
           optionid: entry['optionid']});
   } 
let questionItem = myList.data.find((entry: any) => entry['optiontext'] == '' && entry['questionid'] == item); 

 
qBank.push({options:options, questiontext: questionItem['questiontext'], 
                        questionid:questionItem['questionid'], }); 

                    } 
                   setQBank(qBank)
                   setisLoading(false)
         }      
        genQBank();

  return () => clearInterval(timer);
        }, []
   
);
     const  [questionBank, setQBank] = useState<any>([]);

    const [current, setCurrent] = useState(0)
    const[questionAndAnswer, setQuestionAndAnswer] = useState<Record<number, number>>({

    })
    return (
        <section className="max-w-screen h-screen  flex-col flex items-center justify-center">
            { 
            isLoading ?      <TailSpin color="#0000FF"></TailSpin>: 
            isSubmitted ?
            <div className="flex flex-col items-center justify-center text-green-400">
                <BadgeCheck size={200}></BadgeCheck>
<p className="font-poppins text-4xl mt-10 font-extrabold">Test Submitted!</p>
            </div>
            :
            <div className="w-full  flex-col flex items-center justify-center">
               <div className="w-2/3 flex flex-row   h-5 mb-7 items-center">
          {
          qna == 'no qna' ?
          <div className="text-blue-400 font-bold mt-5 font-inter text-xl cursor-pointer gap-3 flex flex-row mb-2 
           " >
          <AlarmClock></AlarmClock>  {formatTime(time.toString())}
             {/* <LogOut></LogOut> Save & Exit */}
             </div>  :  <p onClick={() => {
   const loc = location as unknown as {key?:string};
    loc.key != 'default'  ? navigate(-1) : navigate('/')}} className="gap-2 font-inter text-lg items-center
 cursor-pointer hover:text-blue-600 flex flex-row w-min"> <ArrowLeft></ArrowLeft> Back  </p>
}
           <div className="flex-1"></div>
      {  qna == 'no qna' ?
<button
onClick={() => {
submitAnswer();
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2
text-white gap-2 bg-blue-500 font-poppins">
Submit
</button> : <p className="font-poppins text-blue-500 mb-2 text-lg ">Test of: {rawList[0] ['username']}</p>
}
          </div>
          { qna == 'no qna' &&
          <div className="w-2/3 bg-blue-400/30 rounded-3xl h-5 mb-7">
        
          <div
           style={{
            width: `${(Object.keys(questionAndAnswer).length / questionBank.length) * 100}%`
           }}
          className={` bg-blue-400 rounded-3xl h-5 `}></div>
          </div>
}
{

    questionBank.filter((entrey: any,) => questionBank.indexOf(entrey) == current).map((entry: any ) =>
  
        <div  className="w-2/3">
              <p className="font-poppins  text-xl text-gray-400 align-baseline mb-2">Question {current+1} of {questionBank.length}</p>
 <p className="font-poppins font-bold text-2xl ">{entry.questiontext}</p> 
 <div className="flex flex-col gap-5  mt-10">
 {
    entry['options'].map((entrye:any, ) => 
    <div 
    onClick={() => {
        if (qna == 'no qna'){
        let iQ = entry.questionid
        let iO = entrye.optionid
        setQuestionAndAnswer({...questionAndAnswer, [iQ]:iO})

        setAnswer(entry['questionid'], entrye['optionid'], code)
        }
        
     } }
        
    className={`cursor-pointer border-2 p-5 rounded-lg flex flex-row font-inter 
${questionAndAnswer[entry.questionid] == entrye.optionid ? 'bg-blue-500/10 border-blue-400' : ' border-gray-400  hover:border-blue-300 transition-all' }`}>
{entrye.optiontext}
<div className="flex-1"></div>
<div className={`rounded-full relative border-2 flex items-center justify-center border-black w-5 h-5 ${questionAndAnswer[entry.questionid]  ==entrye.optionid ? 'border-blue-400' : '' }`}>
{
    
 questionAndAnswer[entry.questionid]  == entrye.optionid && (
   <div  className="bg-blue-400 absolute inset-[2px] rounded-full ">

   </div> 
   )
}

{

}
</div>
    </div>
    )
 }
 </div>
</div>
    )
}

<div className="flex flex-row gap-6 mt-8">
<button 
onClick={()=>{
    setCurrent(current == 0 ? current : current - 1 )}}
className="
flex flex-row rounded-3xl 
hover:scale-102 transition-all
duration-300 hover:bg-blue-400/40
cursor-pointer p-3 w-35 text-lg items-center justify-center text-blue-400 gap-2 bg-blue-400/30 font-poppins">
    <ArrowLeft></ArrowLeft> Previous
</button>
<button
onClick={()=>{
    setCurrent(questionBank.length-1 > current ? current+1 : current)}}

className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-400/40
text-blue-400 gap-2 bg-blue-400/30 font-poppins">
  Next  <ArrowRight></ArrowRight>
</button>

</div>
</div>
}
        </section>

    )
}

export default Test;