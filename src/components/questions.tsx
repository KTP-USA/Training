import {  useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";

const Questions = () => {
    let options1 = ['Module', 'Step', 'Question (Optional)'

    ];
    const [hasCreated, sethasCreated] = useState(false)
const [hasSaved, setHasSaved] = useState(false);
const [qBank3, setQBank3] = useState([]);
    const [editModule, setEditModule] = useState('');
    const [isEditOpen, setIsEditOpen]  = useState(false);
    const [editStep, setEditStep] = useState('');
        const [editQ, setEditQ] = useState('');
        const [currentEdit, setCurrentEdit] = useState(0)
        let options2 = ['Module', 'Step',];
        const [qBank, setQBank] = useState([]);
        async function fetchData() {
           
let mods =await supabase.from('module').select();
let mods2: any = mods.data
setModuleList(mods2);
let step =await supabase.from('step').select();
let step2: any = step.data

setStepList(step2);
        }
        useEffect(() => {
fetchData();
        }, [])
        
        async function genQBank() { 
  console.log('stepmdo', editModule, editStep, editQ)
if (editQ == ''){
   let   myList:any = await supabase.from('questions').select().eq('module', editModule).eq('step',editStep)
console.log('mylist', myList)
  let masterList: any = []; 
  let qBank2: any = [];
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
qBank2.push({options:options, questiontext: questionItem['questiontext'], 
                        questionid:questionItem['questionid'],correctoption: questionItem['correctoption']  }); 

                    } 
                                           qBank2.sort((a: any,b: any) => a.questionid - b.questionid)
                     setQBank(qBank2);
                     setQBank3(qBank2)
                     
                     console.log('setqbanker', qBank2)
                } else {
                     let   myList:any = await supabase.from('questions').select().eq('module', editModule).eq('step',editStep).eq('questionid', editQ).eq('optiontext', '');
let options =  await supabase.from('questions').select().eq('module', editModule).eq('step',editStep).eq('questiontext', '').eq('questionid', myList.data[0]['questionid']);

let qBank2: any = { options:options.data, questiontext:myList.data[0]['questiontext'], 
                        questionid:myList.data[0]['questionid'], correctoption:myList.data[0]['correctoption'],   }  
                        let arrayBank: any = [];
                        arrayBank.push(qBank2)


  setQBank(arrayBank);
  
    console.log('setqbanker', arrayBank)
                    } 
                 setIsEditOpen(true) ; 
                
}
  
             
           const [createStep, setCreateStep] = useState('')
        
        const [createModule, setCreateModule] = useState('')
    const [stepList, setStepList]= useState([]);
    const [moduleList, setModuleList] =useState([]);
        const [createCorrect, setCreateCorrect] = useState('');
   const [createOptions, setCreateOptions]= useState<Record<string, string>>({'A':'', "B":'', "C":'', "D":''});
   const [createQuestion, setCreatedQuestion] = useState('');
     async function saveQuestion() {
       
        for (const entry of qBank){
           
         if (entry != qBank3.find((e) => e['questionid'] == entry['questionid']) || qBank.length == 1){
              if (entry['questiontext'] != ''){
 const hi =  await supabase.from('questions').update({
'questiontext':entry['questiontext'],
'correctoption': entry['correctoption']
    }).eq('questionid', entry['questionid']).eq('optionid', '').eq('step', editStep).eq('module', editModule).select();
      console.log('hi', hi,);
}
    for (const entrye of Object.keys(entry['options'])){
      let letter = entrye == '0' ? 'A' : entrye=='1' ? 'B' : entrye =='2'?'C':
            'D';
            console.log('j', letter, entry['options'][entrye]['optiontext'])
     const hi2 = await supabase.from('questions').update({

'optionid':letter,
            'optiontext':entry['options'][entrye]['optiontext']

    }).eq('optionid',letter ).eq('step', editStep).eq('module', editModule).eq('questionid', entry['questionid']).select();  
   
    }
       setHasSaved(true);
          setTimeout(() => {
        setHasSaved(false)
    }, 5000)  
        }
     
}

    }
async function newQuestion() {
    let getid = await supabase.from('questions').select().eq('module', createModule).eq('step', createStep).eq('optionid', '');
   await supabase.from('questions').insert({
'questiontext':createQuestion,
'questionid':(getid.data?.length ?? 0) +1,
'module': createModule,
'optionid':'',
'optiontext':'',
'step': createStep,
'correctoption': createCorrect
    });
    for (const entry of Object.keys(createOptions)){
      await supabase.from('questions').insert({

'module': createModule,
'step': createStep,
'questionid':(getid.data?.length ?? 0) +1,
'optionid':entry,
'correctoption': '',
'questiontext':'',
            'optiontext':createOptions[entry]

    });  
    }
    sethasCreated(true);
    setTimeout(() => {
        sethasCreated(false)
    }, 5000)
}
    const [createMenu, setCreateMenu] = useState(false);
return (
    <section style={{ height: "calc(105vh - 160px)" }} className="max-w-screen max-h-screen flex items-center justify-center bg-gradient-to-r from-sky-50 to-blue-400  flex-col">
            {
  createMenu &&
      <div onClick={() =>{ 
        setCreateOptions({'A':'', "B":'', "C":'', "D":''});
        setCreatedQuestion('');
        setCreateCorrect('');
        sethasCreated(false);
        setCreateModule(''),
        setCreateStep(''),
        sethasCreated(false),
        setCreateMenu(false)}} className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute bg-black opacity-30 inset-0"></div>
<div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-xl z-10 overflow-y-auto
 font-poppins font-extrabold text-blue-400 text-3xl min-h-4/5 min-w-4/5" >
New Question 
<div className="flex flex-col gap-4 mt-3">
    <div className="flex flex-row gap-5">
    {
    options2.map((e) => 
    <select 
onChange={(er: any)=> {
    e == 'Step' ? setCreateStep(er.target.value) : setCreateModule(er.target.value)
}}
className="border-2 mt-2 border-blue-400 font-poppins rounded-lg p-2 w-fit text-lg text-blue-400 font-normal">
  <option>Select a {e == 'Step' ? 'step' : 'module'}...</option>
   { e=='Step' ? stepList.map((e) => <option>{e['stepname']}</option>) :  moduleList.map((e) => <option>{e['modulename']}</option>) }
</select>
)}
</div>
     <textarea
     value={createQuestion}
     onChange={(e) => {
        setCreatedQuestion(e.target.value)
     }}
     placeholder="Enter Question..." className="font-poppins font-extrabold text-black text-2xl rounded-lg p-2"></textarea> 
 <div className="flex flex-col gap-5  mt-0.5">
 {
    Object.values(createOptions).map((entrye:any,i ) => 
   <div className="flex flex-row gap-3 w-full">
        <textarea
    value={entrye}
    onChange={(er) => {
      
        setCreateOptions({...createOptions, [i == 0 ? 'A' : i==1 ? 'B' : i==2?'C':
            'D'
        ]:er.target.value})
console.log('did it work?', {...createOptions, [i == 0 ? 'A' : i==1 ? 'B' : i==2?'C':
            'D'
        ]:er.target.value} )
       
        
     } }
        
    className='cursor-pointer border-2 font-medium p-2.5 text-lg w-full rounded-lg flex flex-row font-inter 
'>

    </textarea>
    <Check
    onClick={() => setCreateCorrect(i == 0 ? 'A' : i==1 ? 'B' : i==2?'C':
            'D')}
    size={35} className={`${createCorrect == (i == 0 ? 'A' : i==1 ? 'B' : i==2?'C':
            'D') ? 'text-green-500' : 'text-gray-500'} cursor-pointer`}></Check>
    </div>
    )
 }
 </div>
</div>
<div className="flex flex-row ">
   <div className="flex-1"></div> 
<button
onClick={() => {
 newQuestion();
}}
className={` ${hasCreated ? 
  'bg-green-500 ' : "bg-blue-500 hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer"
}
flex flex-row rounded-3xl   p-3 w-35 mt-6 self-end font-normal text-lg items-center justify-center   py-2
text-white gap-2  font-poppins`}>
{hasCreated ? 'Created' : 'Create'}</button>
</div>
      </div>
      </div>
        
    }
        {
  isEditOpen &&
      <div onClick={() =>{ 
        
        setIsEditOpen(false); setCurrentEdit(0); setHasSaved(false);
      }} className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute bg-black opacity-30 inset-0"></div>
<div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-xl z-10 overflow-y-auto
 font-poppins font-extrabold text-blue-400 text-3xl min-h-4/5 min-w-4/5" >
Edit Question 
<div className="flex flex-col gap-1 mt-3">
    <div className="flex flex-row gap-5">
    {/* {
    options2.map((e) => 
    <input 
onChange={(er: any)=> {
    e == 'Step' ? setCreateStep(er.target.value) : setCreateModule(er.target.value)
}}
placeholder={e}
className="border-2 mt-2 border-blue-400 font-poppins rounded-lg p-2 w-fit text-lg text-blue-500 font-bold">

</input>
)} */}
</div>
  {qBank.length >1 && <p className="font-poppins mt-2 text-xl text-gray-500 ml-1 align-baseline font-normal ">Question {currentEdit+1} of {qBank.length}</p>}
     <textarea
     value={qBank[currentEdit]['questiontext']}
     onChange={(e) => {
       setQBank(prev => {
        const updated: any = [...prev];
        updated[currentEdit] = {
            ...updated[currentEdit],
            questiontext: e.target.value,
        }
        return updated;
       })
     }}
     placeholder="Enter Question..." className="font-poppins font-extrabold text-black text-2xl rounded-lg p-2 mb-0.5"></textarea> 
 <div className="flex flex-col gap-5  ">
 {
    Object.values(qBank[currentEdit]['options']).map((entrye: any,i ) => 
   <div className="flex flex-row gap-3 w-full">
        <textarea
   
    value={entrye['optiontext']}
    onChange={(er) => {
   
        
setQBank(prev => {
    
  const updated: any = [...prev]; 
  updated[currentEdit] = {
    ...updated[currentEdit],  
    options: {
      ...updated[currentEdit].options, 
      [i]: {
        ...updated[currentEdit].options[i], 
        optiontext: er.target.value  
      }
    }
  };
  return updated;
});

       
        
     } }
        
    className='cursor-pointer border-2 p-2.5  font-medium text-lg w-full rounded-lg flex flex-row items-center justify-center font-poppins
'>

    </textarea>
    <Check
    onClick={(er) => {
         let letter = i == 0 ? 'A' : i==1 ? 'B' : i==2?'C':
            'D';
      

        setQBank(prev => {
             
        const Updated: any = [...prev];
       
         Updated[currentEdit] = {
            ...Updated[currentEdit],
          
            correctoption: letter

            }
return Updated;
          })
    }}
    size={35} className={`${qBank[currentEdit]['correctoption'] == (i == 0 ? 'A' : i==1 ? 'B' : i==2?'C':
            'D') ? 'text-green-500' : 'text-gray-500'} cursor-pointer`}></Check>
    </div>
    )
 }
 </div>
</div>

<div className="flex flex-row gap-6 mt-6 items-center">
    {
        qBank.length >1 &&
        <div className="flex flex-row gap-6">
<button 
onClick={()=>{
        setCurrentEdit(currentEdit == 0 ? currentEdit : currentEdit - 1 )}}
className="
flex flex-row rounded-3xl 
hover:scale-102 transition-all
duration-300 hover:bg-blue-400/40 h-fit
cursor-pointer p-3 w-35 text-lg items-center justify-center text-blue-400 gap-2 bg-blue-400/30 font-poppins">
    <ArrowLeft></ArrowLeft> Previous
</button>
<button
onClick={()=>{
    setCurrentEdit(qBank.length-1 > currentEdit ? currentEdit+1 : currentEdit)}}

className="h-fit
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-400/40
text-blue-400 gap-2 bg-blue-400/30 font-poppins">
  Next  <ArrowRight></ArrowRight>
</button>
</div>
}
<div className="flex-1"></div> 
<button
onClick={() => {
 saveQuestion();
}}
className={` ${hasSaved ? 
  'bg-green-500 ' : "bg-blue-500 hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer"
}
flex flex-row rounded-3xl  p-3 w-35 mt-6 self-end font-normal text-lg items-center justify-center   py-2
text-white gap-2 font-poppins`}>
{hasSaved ? 'Saved' : 'Save'}
</button>
</div>

      </div>
      </div>
        
    }
<h1 className="font-poppins  font-bold text-5xl text-blue-500  ">Manage Questions</h1>

<div className="mt-10 bg-white  rounded-2xl py-10 px-10 w-100 flex items-center justify-center flex-col ">
{
    options1.map((e) =>{
 return  e == 'Question (Optional)' ?
   <input
   placeholder={e}
onChange={(er)=> {
    setEditQ(er.target.value)
}} 
className="border-2 mt-2 border-blue-400 font-poppins rounded-lg p-3 w-full text-blue-500 font-bold">
   
</input>  
    :  <select
onChange={(er)=> {
    e == 'Step' ? setEditStep(er.target.value) : 
    e == 'Module' ?
    setEditModule(er.target.value) : setEditQ(er.target.value)
}} 
className="border-2 mt-2 border-blue-400 font-poppins rounded-lg p-3 w-full text-blue-500 font-bold">
    <option>Select a {e == 'Step' ? 'step' : 'module'}...</option>
   { e=='Step' ? stepList.map((e) => <option>{e['stepname']}</option>) :  moduleList.map((e) => <option>{e['modulename']}</option>) }
</select> 
 }
)}
<button

onClick={() => {
    genQBank();
}}
className=" hover:bg-blue-600
flex flex-row rounded-3xl  cursor-pointer p-3  text-lg items-center justify-center hover:scale-102 transition-all
duration-300 py-2 w-full mt-4
text-white gap-2 bg-blue-500 font-poppins">
Edit
</button> 
<p className="mt-3 text-gray-500 font-bold font-poppins ">OR</p>
<button
onClick={() => {
    setCreateMenu(true)
}}
className=" hover:bg-blue-600
flex flex-row rounded-3xl  cursor-pointer p-3  text-lg items-center justify-center hover:scale-102 transition-all
duration-300 py-2 w-full mt-4
text-white gap-2 bg-blue-500 font-poppins">
Create New
</button> 
</div>
    </section>
)
}

export default Questions;