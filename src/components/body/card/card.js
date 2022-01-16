import React, {useState, useEffect} from 'react'
import './card.css'


function Card({space}) {

    const [read,setRead] = useState(false);

    const [clicked,setClicked] = useState(false);

    

    return (
        <div className='card'>
           
            <img className='space-image' src={space.url}></img>

            <div className='top-info'>
                <label>{space.title}</label>
                <label>{space.date}</label>
            </div>

            <div className='image-info'>
                {
                    read==false ? (<p className='description'>{space.explanation}</p>) 
                    : (<p className='description-full'>{space.explanation}</p>)
                }
                
                <button className='btn read-button' onClick={() => {
                    read==false ? setRead(true) : setRead(false)
                }}>Read More</button>
                
                
            </div>

            <div className='like-section'>
                <button className='btn like-button' title='Like Image' onClick={(e) => {
                    e.preventDefault();
                    e.target.style.backgroundColor == 'red' ? e.target.style.backgroundColor = 'white' : e.target.style.backgroundColor = 'red';
                    e.target.style.backgroundColor == 'red' ? setClicked(true) : setClicked(false)
                }}>🚀</button>

                <a className='share' href={space.url} target="_blank" title='Share Image'>🔗</a>
            </div>

        </div>
    )
}

export default Card
