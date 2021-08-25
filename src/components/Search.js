import React, {useState} from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core'
import shrtcode from '../api/shrtcode'
import axios from 'axios'; 


const Search = () => {
    const[link, setLink] = useState('');
    const [short, setShort] = useState('')
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(link);
        getLink();

    };

    const getLink = async () => {
        try{
        const {data} = await axios
        .get(`https://api.shrtco.de/v2/shorten?url=${link}`)
       setShort(data.result.short_link)
        }
        catch(error){
            console.log(error.message)
        }
        
    }
    
    return (
        <>
            <form onSumbit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column'}}>
                <TextField style={{ marginBottom: '20px'}}  
                label="Input your link"
                variant="outlined"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                />
                <Button onClick={(e) => handleSubmit(e)}variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            <div>
                {short !== '' ? <a target='_blank' rel='noreferrer' href={link}>{short}</a> : <p>your short link will appear here</p>}
                
            </div>
        </>
    )
}

export default Search; 