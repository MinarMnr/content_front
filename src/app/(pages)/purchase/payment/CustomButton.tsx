import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  token: string;
  postdata: string;
  order: string;
  endpoint: string;
}

const FuckHim: React.FC<CustomButtonProps> = (props) => {
  return (
    <button {...props}>
      Click Me
    </button>
  );
};

export default FuckHim;
