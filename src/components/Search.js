import React, {useState} from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core'
import axios from 'axios'; 
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
    const[link, setLink] = useState('');
    const [short, setShort] = useState('');
    const [isLoading, setIsLoading] = useState(false);
     
    const validateURL = (string) => 
    {
        return string.match(HTTP_URL_VALIDATOR_REGEX)
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateURL(link)) {
           getLink();
        setLink('');
        setIsLoading(!isLoading) 
        } else {
            setShort('please input valid url')
        }
    };

    const getLink = async () => {
        try{
        const {data} = await axios
        .get(`https://api.shrtco.de/v2/shorten?url=${link}`)
       setShort(data.result.short_link);
       setIsLoading(false)
        }
        catch(error){
            console.log(error.message)
        }
        
    }
    
    return (
        <>
            <StyledForm onSumbit={(e) => handleSubmit(e)}>
                <TextField style={{ marginBottom: '20px'}}  
                label="Link"
                variant="outlined"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                />
                {!isLoading && (
                  <Button 
                style={{marginBottom: '20px'}}
                onClick={(e) => handleSubmit(e)}
                variant="contained" 
                color="primary">
                    Submit
                </Button>  
                ) }

                {isLoading && <LinearProgress />}
                
            </StyledForm>
            <div>
                {short !== '' ? <a target='_blank' rel='noreferrer' href={link}>{short}</a> : <p>your short link will appear here</p>}
                
            </div>
        </>
    )
}

export default Search; 