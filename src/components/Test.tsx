



import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import {TailSpin, } from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {ArrowLeft, ArrowRight, BadgeCheck, BadgeX, AlarmClock, Lock} from "lucide-react"
const Test  = () => {








    const [cantGo, setCantgo] = useState(false);
 const [time, setTime] = useState(540);
 const navigate = useNavigate();
 const locs = useLocation();
 const qna = locs.state ?? 'no qna'
 function formatTime(seconds: any) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60




  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }




  return `${m}:${s.toString().padStart(2, "0")}`
}








const [isLoading, setisLoading] = useState(true);
const [score, setScore] = useState(100);
const [isFullScreen, setIsFullScreen] = useState(false);
const [rawList, setRawList] = useState([]);
const {code} =useParams();
// async function addTime(){
// setInterval( () =>{
//     setTime((prev) => prev-1)
// }, 1000)
// }
function setScreen(){
    if (!isFullScreen){
        document.documentElement.requestFullscreen();
       
    } else {




    }
}
const [isSubmitted, setIsSubmitted] = useState(false);
async function submitAnswer(){
 
 
  let   testList:any = await supabase.from('savedtest').select().eq('controlnbr', code ?? 29108);
    let   stupidList:any = await supabase.from('users').select().eq('username', testList.data[0]['username']);
 testList = testList.data;
  let rawList = stupidList.data;
 
    let newList: any =testList.map((e: any) => {
        return { 'questionid':[e['questionid']], 'correcttest':e['correcttest']};
   
    })
    let correctcount: number = 0;
 for (const item of newList){
    if (questionAndAnswer[item['questionid']] == item['correcttest']){
correctcount= correctcount+1
    }
 }
 let getSupervisor = await supabase.from('users').select().eq('username', testList[0]['username']);
 let score = (correctcount/testList.length);
 setScore(Math.round(score *100))
   function getNextDate(date: any, step: String){
 date = new Date(date);
 if (step == '30D'){
   date.setDate(date.getDate()+60);
    return date.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'2-digit',
        });
 } else  if (step == '90D'){
    date.setDate(date.getDate()+180);
    return date.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'2-digit',
        });
 } else  if (step == '180D'){
 date.setFullYear(date.getFullYear()+1);
    return date.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'2-digit',
        });
 } else  if (step == '1Y'){
     date.setFullYear(date.getFullYear()+2);
    return date.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'2-digit',
        });
 }  else  if (step == '2Y'){
     date.setFullYear(date.getFullYear()+3);
    return date.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'2-digit',
        });
 }
    }
 let date = new Date();
  await supabase.from('testrecords').update({
       
        'username':rawList[0]['username'],
        'date': date.toLocaleDateString('en-US', {
            month:'numeric',
           
day:'2-digit',
year:'2-digit',




        }),
        'module':rawList[0]['module'],
    'supervisor': getSupervisor.data![0]['supervisor'],
        'score': Math.round(score *100),
        'type':'Competency Test',
        'result': score >= 0.8 ? 'PASS' : 'FAIL',
        'controlnbr':code,
        'step':rawList[0]['step'],
       
    }).eq('id', code);
   
    if (score < 0.8){
     
         let date: Date =new  Date();
       
          let insert = date.setDate(date.getDate()+30)
         
     await supabase.from('testrecords').insert({
   
    'username': rawList[0]['username'],
    'supervisor':rawList[0]['supervisor'],
    'type': 'Competency Test',
 'nextdate':date,
    'module': rawList[0]['module'],
    'step': rawList[0]['actualstep']
});  
    }
let stuoidlist: any = await supabase.from('testrecords').select().eq('module', rawList[0]['module']).eq('step',rawList[0]['actualstep']).eq('username', rawList[0]['username'])
.eq('supervisor', rawList[0]['supervisor']).eq('result', 'READY');
const list = ['Technical Evaluation',  'Performance review']




if (stuoidlist.data.length >= 2  && score>=0.8){
   console.log(
    'rawlist', rawList,
   
    'stuodi:', stuoidlist,
    'actualstep:',
stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' :
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
  'nextdate:', getNextDate(rawList[0]['hiredate'], stuoidlist.data[0]['step']  ),
'.eq(username, ' , rawList[0]['username']


    )
 const {error, data, status,} =  await supabase.from('users').update({
          'actualstep': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' :
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
  'nextdate': getNextDate(rawList[0]['hiredate'], stuoidlist.data[0]['step']  )
 } ).eq('username', rawList[0]['username']).select();
console.log(
  'User update error:', error, data, status
)


for (const item of list){
 let date: Date =new  Date(rawList[0]['nextdate']);
await supabase.from('testrecords').insert({
   
    'username': rawList[0]['username'],
    'supervisor':rawList[0]['supervisor'],
    'type': item,
    'nextdate':getNextDate(rawList[0]['hiredate'], stuoidlist.data[0]['step']  ),
    'step': stuoidlist.data[0]['step'] == '30D' ? '90D' : stuoidlist.data[0]['step']== '90D' ? '180D' :stuoidlist.data[0]['step'] == '180D' ? '1Y' :
  stuoidlist.data[0]['step'] == '1Y' ? '2Y' : '3Y',
    'module': rawList[0]['module'],
})
}
}
setIsSubmitted(true);
   document.exitFullscreen();
    setCantgo(false)
}
async function setAnswer(id: any, answer: any, controlnbr: any){
    await supabase.from('savedtest').update({'useranswer':answer}).eq('questionid', id).eq('controlnbr', controlnbr)
}
const timerRef = useRef<NodeJS.Timeout | null>(null);




  async  function handleFullScreenChange(){
        setIsFullScreen(!!document.fullscreenElement);
   
      if (!!document.fullscreenElement){
         
    if (!timerRef.current){
     
 timerRef.current = setInterval( () =>{
       
    setTime((prev) => {
        if ( prev==1){
            if (!cantGo){
               
  setCantgo((prev) => {
    if (!prev){
         submitAnswer();
        return true;
    }
    return prev;
  })




         
           
            }
              clearInterval(timerRef.current as unknown as number);
        timerRef.current = null;          
        return 0;
        }
        return prev == 0 ? 0 : prev-1})
   
 
}, 1000)
    }




} else {
         
    if (timerRef.current){
        clearInterval(timerRef.current);
        timerRef.current = null
    }
}
    }
 useEffect(() => {
 
    document.addEventListener("fullscreenchange", handleFullScreenChange);
   
    if (qna != 'no qna'){
        setQuestionAndAnswer(qna);
    }




 async function genQBank() {
 




  let   stupidList:any = await supabase.from('savedtest').select().eq('controlnbr', code ?? 29108);
 
 setRawList(stupidList.data);
  setTime(stupidList.data[0]['step'] == '30D' ? 1200 : stupidList.data[0]['step'] =='90D' ? 1800 : stupidList.data[0]['step'] =='180D' ? 2400 :
    stupidList.data[0]['step']=='1Y' ? 3600 : stupidList.data[0]['step'] == '2Y' ? 5400 : 7200
   )
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


options = options.sort((a: any,b:any) => {
 return   a['optionid'].localeCompare(b['optionid'])})
 
qBank.push({options:options, questiontext: questionItem['questiontext'],
                        questionid:questionItem['questionid'], });




                    }
                   setQBank(qBank)
                   setisLoading(false)
         }      
        genQBank();




 return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
       if (timerRef.current) {clearInterval(timerRef.current);}
    };
        }, []
   
);
     const  [questionBank, setQBank] = useState<any>([]);




    const [current, setCurrent] = useState(0)
    const[questionAndAnswer, setQuestionAndAnswer] = useState<Record<number, number>>({




    })
    return (
        <section   className="mt-15  flex-col flex items-center justify-center">
            {
            isLoading ?      <TailSpin color="#0000FF"></TailSpin>:
            isSubmitted ?
            <div style={{ height: "calc(90vh - 200px)" }} className={`flex flex-col items-center justify-center
           ${Number(score) >= 80 ? 'text-green-500' : 'text-red-400'}
           
            `}>
             
             
             
          { Number(score) >= 80 ? <BadgeCheck size={200}></BadgeCheck> : <BadgeX size={200}></BadgeX>}
<p className="font-poppins text-4xl mt-10 font-extrabold">Test Submitted</p>
<p className="font-poppins text-2xl mt-3 font-extrabold">Your Score: {score}%</p>




           </div>
         
            :
            !isFullScreen && qna == 'no qna' ?
           
              <div style={{ height: "calc(90vh - 200px)" }}  className="flex flex-col mx-5 items-center justify-center text-blue-400">
                <Lock size={200}></Lock>
<p className="font-poppins text-3xl text-center mt-10 font-extrabold">The test is locked until you activate full screen mode.</p>
<button
onClick={() => {
setScreen();
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 mt-8 text-lg items-center justify-center hover:scale-105 transition-all
duration-300 hover:bg-blue-600 py-4 font-bold scale-103
text-white gap-2 bg-blue-500 font-poppins">
Full Screen Mode
</button>
            </div>
           
            :
            <div className="w-full lg-mb-0 mb-14 flex-col flex items-center justify-center">
               <div className="w-2/3 flex flex-row   h-5 mb-7 items-center">
          {
          qna == 'no qna' ?
          <div className="text-blue-400 font-bold mt-5 font-inter text-xl cursor-pointer gap-3 flex flex-row mb-2
           " >
          <AlarmClock></AlarmClock>  {formatTime(time)}
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
<div className={`rounded-full relative border-2 border-black w-5 h-5 flex-shrink-0 flex items-center justify-center ${questionAndAnswer[entry.questionid] == entrye.optionid ? 'border-blue-400' : ''}`}>
  {questionAndAnswer[entry.questionid] == entrye.optionid && (
    <div className="bg-blue-400  rounded-full w-full h-full border-2 border-white self-center"></div>
  )}
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









