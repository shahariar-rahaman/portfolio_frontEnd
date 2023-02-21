import React, { useContext } from 'react'
import { Container,Form,Button,InputGroup,Spinner } from 'react-bootstrap'
import {store} from '../ContextProvider'
import JoditEditor from 'jodit-react';
import { useState, useRef} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BasicPost = () => {
    const URL=process.env.REACT_APP_BASE_URL
    const [projectArr, setProjectArr] = useState([]);
    const editor = useRef(null);
    const navigator = useNavigate()
    const[spin,setSpin] = useState(false)
    const [content, setContent] = useState('')
    const [url,setUrl] = useState('')
    const [link,setLink] = useState('')
    const[title,setTitle]=useState("")
    const handleFileUpload = async (e) => {
      e.preventDefault();
      setSpin(true);
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      try {
        const { data } = await axios.post(`${URL}/upload`, bodyFormData);
        setUrl(data.secure_url);
      } catch (err) {
        console.log(err);
      }
      setSpin(false);
    };
     //Comment
     const handleChange=(e,lable)=>{
      if(projectArr.indexOf(lable) >-1)
        setProjectArr(projectArr.filter((item)=>item !== lable))
      else
      setProjectArr([...projectArr,lable])
    }
    console.log(projectArr)
      //Comment
      const handleSubmit = (e)=>{
      e.preventDefault()
        async function basicPost(){
          const {data} = await axios.post(`${URL}/basicPost`,{
            title:title,
            description:content,
            link:link,
            image:url,
            project:projectArr
            
          })
        }
        basicPost()
        navigator('/')
        }
  return (
    <div className="backGround">
    <Container>
         <div key ={1} className='blogEditor'>
          <Form>
          <p className='content'>Post Others</p>
          <div className='contentWidth'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
          </Form.Group>
          <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} 
			onBlur={newContent => setContent(newContent)} 
			onChange={newContent => {}}/>
			<Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="link" onChange={(e)=>setLink(e.target.value)}/>
          </Form.Group>
          <InputGroup size="sm" className="mt-3">
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm" type='file' onChange={handleFileUpload}/>
        </InputGroup>
        <div className='mt-3'>
          <Form.Check
            inline
            label="Figma"
            type="checkbox"
            onChange={(e)=>handleChange(e,"Figma ")}
          />
          <Form.Check
            inline
            label="Html/CSS"
            type="checkbox"
            onChange={(e)=>handleChange(e,"Html/CSS ")}
          />
            <Form.Check
              inline
              label="Bootstrap/Others"
              type="checkbox"
              onChange={(e)=>handleChange(e,"Bootstrap/Others ")}
            />
          <Form.Check
            inline
            label="React"
            type="checkbox"
            onChange={(e)=>handleChange(e,"React")}
          />
    </div>
    {
          spin?
          <div>
          <Spinner animation="border" variant="warning" />
              <Button className="buttonStyle buttonFlex mt-3" disabled>Submit</Button>
        </div>
          :
          <Button className="buttonStyle mt-3" onClick={handleSubmit} type="submit">Submit</Button>

        }
          </div>
        </Form>
        </div>
    </Container>
    </div>
  )
}

export default BasicPost