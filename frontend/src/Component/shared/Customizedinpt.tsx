import { TextField } from '@mui/material';
import React from 'react';

type Props= {
    name:string;
    type:string;
    label:string;
}

export const Customizedinpt = (props : Props) => {
  return (
    <TextField margin='normal'
    InputLabelProps={{style:{color:"white"}}}
    name={props.name} label={props.label} type={props.type}
    inputProps={{style:{width:"400px" , borderRadius: 10, fontSize:20 , color:"white"}}}
    />
  )
}
