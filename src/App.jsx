import { useEffect,useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"


function App() {
  const [length,setLength]=useState(6);
  const [numInclude,setNumInclude]=useState(false);
  const [charInclude,setCharInclude]=useState(false);
  const [password,setPassword]=useState("gy jb byuyg");

  //useRef
  const passRef=useRef(null);

  // passGen
  const passwordGenertor=useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(numInclude) str+="0123456987"
    if(charInclude) str+="!@#$%^&*()_+=-"
    for(let i=0;i<length;i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(pass)
  },[length,numInclude,charInclude,setPassword])
  useEffect(()=>{passwordGenertor()},[length,charInclude,numInclude,passwordGenertor])
  //toCopy
  const copyTo=useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  return (
    <>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 m-2 my-8 text-orange-500 bg-gray-700">
      <h3 className="mb-4 font-bold leading-none tracking-tight text-orange-600 align-middle mx-[30%] dark:text-white">Password <mark className="px-2 text-white bg-orange-600 rounded dark:bg-orange-500">Generator</mark> </h3>
       <div className="flex gap-2"> <input 
          type="text"
           value={password}
           className="outline-none rounded-lg w-full py-1 px-3"
           placeholder="Password"
           readOnly
           ref={passRef}
        />
        <button onClick={copyTo} className="py-0.5 px-3 outline-none bg-orange-600 text-white shrink-0 rounded-lg">Copy</button>
        </div>
        <div className="flex my-4 gap-1">
          <input 
            type="range"
            min={6} 
            max={24}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label> Length:{length}</label>
          <input 
            type="checkbox"
            defaultChecked={charInclude}
            id="char" 
            onChange={()=>{
              setCharInclude((prev)=>!prev)
            }}
          />
          <label>Charecter</label>
          <input 
            type="checkbox"
            defaultChecked={charInclude}
            id="Nums" 
            onChange={()=>{
              setNumInclude((prev)=>!prev)
            }}
          />
          <label>Number</label>
        </div>
      </div>

    </>
  )
}

export default App
