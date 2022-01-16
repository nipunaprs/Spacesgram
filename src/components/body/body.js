import React, {useEffect, useState} from 'react'
import './body.css'
import Card from './card/card'
import {getNasaData} from '../../api/index'



function Body() {

    const [space,setSpace] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [multiplier, setMultiplier] = useState(1)
    const [allowFilter,setAllowFilter] = useState(false)

    //Get images
    useEffect(() => {
        setIsLoading(true)
        
        var d = new Date();
        d.setDate(d.getDate())
        const end_date = d.toJSON().slice(0,10).split('-').join('-');


        getNasaData('2022-01-01',end_date)
            .then((data) => {
                setSpace(data.reverse())
                setIsLoading(false)
            });
        

    },[]);

    
    return (
        <div className='body'>
            {isLoading ? (
                <div className='loading-screen'>
                    <img classname='loading-gif' src='/loader.gif'/>
                    <label className='bold-text'>Loading Space Goodies</label>
                </div>
            ) : (
                <>
                
                <div className='dates'>
                <div><a onClick={() => {allowFilter ? setAllowFilter(false) : setAllowFilter(true)}}>Filter By Dates</a></div>
                    {allowFilter ? ( 
                        <>
                        <input type="date" id='start_date' className='date-input'/>
                        -                    
                        <input type="date" id='end_date' className='date-input'/>
                        <button className='filter-btn' onClick={() => {

                            const start_date = document.getElementById('start_date').value
                            const end_date = document.getElementById('end_date').value
                            
                            
                            getNasaData(start_date,end_date)
                                .then((data) => {
                                    setSpace(data.reverse())
                                    setIsLoading(false)
                                });
                            
                            
                        }}>Filter</button></>
                    ) : (
                        ""
                    )}
                    
                </div>

                
                

                {space?.map((space,i) => (
                    
                    <Card 
                        space={space}   
                    />

                ))}

                <div className='load-area'>
                <button className='load-button' onClick={() => {
                    
                    
                    var d = new Date();
                    d.setDate(d.getDate())
                    const end_date = d.toJSON().slice(0,10).split('-').join('-');


                    var d = new Date();
                    d.setDate(d.getDate() - 30*multiplier)
                    const start_date = d.toJSON().slice(0,10).split('-').join('-');
                    setMultiplier(multiplier+1)                                    
                    
                    if(multiplier==5) alert('Your requesting pictures quite far back so please give us some time to grab them! :)')

                    setIsLoading(true)
                    let x = window.pageYOffset;
                    console.log(x)
                    getNasaData(start_date,end_date,x)
                        .then((data) => {
                            setSpace(data.reverse())
                            setIsLoading(false)
                            window.scrollTo(0, x);
                        });

                }}>Load More</button>
                </div>
                
            </>)}
           
        </div>
    )
}

export default Body
