import React from 'react'
import './Card.css'

export default function Card(props){
    
    return(
        <div className='Card-container'> 
            <div className='Card-image-container'>
                <img className='Card-image' draggable={false} src={props.source} alt={'someName'}></img>
            </div>
            <div className='Card-name'>{props.name}</div>
            <div className='Card-job'>{props.job}</div>
        </div>
    )
}
