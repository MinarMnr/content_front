"use client";

import { useSearchParams } from "next/navigation";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import { useState } from "react";

const RegisterForm = ({cache_storer}: {cache_storer: any}) => {

  const params = useSearchParams();
  const [data, setData] = useState();
  
  switch(params?.get('step')){
    case '1':
      return <Step1 data={data} setData={setData} cache_storer={cache_storer} />
    case '2':
      return <Step2 data={data} setData={setData} cache_storer={cache_storer} />
    case '3':
      return <Step3 data={data} setData={setData} cache_storer={cache_storer} />
    default:
      return null;
  }
};

export default RegisterForm;
