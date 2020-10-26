import React, {useImperativeHandle, forwardRef} from 'react';
import style from './index.module.scss';

function Input(props, parentRef){
    const inputRef = React.useRef(); 
    useImperativeHandle(parentRef, () => {
        return {
            getValue(){
                return inputRef.current.value;
            }
        }
    })
    return (
    <div className={style['container']}>
        <input type="text" 
            placeholder={props.placeholder}
            style={props.style} 
            className={style['input']}
            ref={inputRef}
            onChange={(e) => {
                props.onChange && props.onChange(e)
            }}
         />
        {
            props.title?(
                <div className={[style['btn'],props.disable?style['disable']:''].join(' ')}>{props.title}</div>
            ) : ''
        }
    </div>
    )
}
const ForWardInput = forwardRef(Input);

export default ForWardInput;