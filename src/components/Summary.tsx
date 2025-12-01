import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
const Summary = () => {
    const fakedata = [];
    const modules =['30D', '90D', '180D', '1Y', '2Y', '3Y']
    const modules2=['30D Module', 'Trainer List', 'SOPs'];
    const [selectedUser, setSelectedUser] = useState('no user');
    const [userData2, setUserData2] = useState([])
    const [testData, setTestData] = useState([]);

     const [testData2, setTestData2] = useState([]);
     async function openUrl(step: String, module: String) {
       
        let entry = await supabase.from('documents').select().eq('step', step).eq('module', module)
      
         let url =supabase.storage.from('module').getPublicUrl(entry.data![0]['path']);
     
      window.open(url.data.publicUrl.replace('%0D%0A', ''), "_blank", "noopener,noreferrer");
     }
     const [isAdmin, setIsAdmin] = useState(false);
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    async function LoadData() {
        let user: any = await supabase.from('users').select().eq('role', 'USER');
       
        await supabase.from('users').select()
     
       let test: any= await supabase.from('testrecords').select();
       setUserData(user.data.sort((a: any,b: any)=> a['username'].localeCompare(b['username'])));
       setTestData2(test.data)


        let session = await supabase.auth.getSession();
    let userData1: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);

    setIsAdmin(userData1.data[0]['role'] != "USER")
    if (userData1.data[0]['role'] == 'USER'){
    setTestData(test.data)
    setUserData2(user.data)
    setSelectedUser(user.data[0]['username'])
}
    }
    useEffect(() =>{
LoadData();
    }, [])
    return (
        <section className="mx-15 flex flex-col mt-14 justify-center items-center mb-10">
            <div className=" flex flex-row gap-4 mb-2">
            <h1 className="font-poppins text-blue-500 font-bold text-5xl mb-4 mr-5">Summary</h1>
           
<button
onClick={
    () => {
navigate('/manager')
    }
}
className=" h-min
flex flex-row rounded-2xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2
text-white gap-2 bg-blue-500 font-poppins">
Details
</button>
            </div>
                { 
    isAdmin &&
            <div className="flex flex-row items-center  mb-4">
             

                <p className="font-poppins"> Choose a user:</p>


    <select 
 value={selectedUser}
  onChange={(er)=> {
    setSelectedUser(er.target.value)
    setUserData2(userData.filter((entry) => entry['username'] == er.target.value))
setTestData(testData2.filter((e)=> e['username'] == er.target.value))
console.log('rr ', userData.filter((e)=> e['username'] == er.target.value), testData2.filter((e)=> e['username'] == er.target.value) )
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

 </div> 

}
           <div className="flex flex-row ">
{
    modules.map((e)=> {
      
    return     <div className="flex flex-col ">
    <div className={`p-3 text-white
    border-blue-500 border-2
    ${e=='30D' ? 'rounded-tl-lg' : e=='3Y' ? 'rounded-tr-lg':''}  font-poppins text-center px-7 py-5 font-bold text-2xl ${e=='30D' ? 'bg-[#fe0a0a]': e=='90D' ?  'bg-[#ff6565]'  : 
e == '180D' ? 'bg-[#ff8888]' : e == '1Y' ? 'bg-[#504afe]'  : e == '2Y' ? 'bg-[#3933fd]'  :
'bg-[#1d15ff]' 

    }`}>
{e} <br/> Module

    </div>
    <div className={`border-blue-500 border-2 p-3 font-poppins
        
        font-bold
        text-2xl min-h-15 ${ (userData2.length == 0 || (selectedUser == '' && !isAdmin))
    ? '' :  userData2[0]['actualstep'] == e ?  'text-yellow-500' : 'text-blue-400'}`}>
     {
    ( userData2.length == 0 || (selectedUser == '' && !isAdmin))
    ? '' :
     userData2[0]['actualstep'] == e ? 'CURRENT' : modules.indexOf(userData2[0]['actualstep']) < modules.indexOf(e) ? '' : 'READY'}
    </div>
     <div className="border-blue-500 border-2 p-3 font-poppins pr-10">
    <p className="text-blue-500 text-xl mb-2">Test Results</p>
    <p>Technical Evaluation: {
     
    testData.length == 0 && (selectedUser == 'no user' || !isAdmin)
    ? ''
    : `${(testData.find((e2) => e2['step'] == e && e2['type'] == 'Technical Evaluation') ?? {'score':''})['score']??''} `
   
   }</p>
    <p className="mt-1">Competency Test: {
            testData.length == 0 && (selectedUser == 'no user' || !isAdmin)
    ? ''
    : `${(testData.find((e2) => e2['step'] == e && e2['type'] == 'Competency Test') ?? {'score':''})['score']??'' }`
        }</p>
    <p className="mt-1">Performance Review:   {  testData.length == 0
    ? ''
    : `${(testData.find((e2) => e2['step'] == e && e2['type'] == 'Performance review') ?? {'score':''})['score'] ??''}`}</p>
    </div>
      <div className={`border-blue-500 border-2 p-3 font-poppins  ${e=='30D' ? 'rounded-bl-lg' 
: e=='3Y' ? 'rounded-br-lg' :''

      }`}>
    {
        modules2.map((item) =>
     <div
        onClick={() => {
         if ( item == 'Trainer List'){
            navigate('/training-topics', {state: [selectedUser, e]})
         } else if (item == 'SOPs') {
            navigate('/sops', {state: [e, userData2[0]['module']]})
         } else {
            openUrl(e, userData2[0]['module']);
             
         }

        }}
        className={`p-3 text-white cursor-pointer font-poppins text-center rounded-4xl mt-4 px-7  font-bold text-xl  ${

            e=='30D' ? 'bg-[#fe0a0a]': e=='90D' ?  'bg-[#ff6565]'  : 
e == '180D' ? 'bg-[#ff8888]' : e == '1Y' ? 'bg-[#504afe]'  : e == '2Y' ? 'bg-[#3933fd]'  :
'bg-[#1d15ff]' 

    }`}>
{item == '30D Module' ? `${e} Module` : item} <br/> 

    </div>
        )
}
  </div>
    </div>
    }
    )
}
</div> 

        </section>
    )
}

export default Summary;