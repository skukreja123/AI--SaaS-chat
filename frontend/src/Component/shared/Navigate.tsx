import { Link } from "react-router-dom";

type Props ={
    to:string;
    bg: string;
    text: string;
    textColor: string;
    onClick?:()=>Promise<void>;
}
export const Navigate = (props : Props) => {
  return (
    <Link
    className="nav-link"
     to={props.to} 
     style={{backgroundColor: props.bg, color:props.textColor}}>{props.text}
     </Link>
  )
}
