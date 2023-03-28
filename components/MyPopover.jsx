import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import { CiEdit } from 'react-icons/ci'; 
import { useState } from 'react'; 
const axios = require('axios');


function MyPopover({tabs, updateTabs, id}){ 

  const [ newTabName, updateNewTabName ] = useState('')
  const [ vis, updateVis ] = useState(false) 

  const editTabName = async (e) => {
    e.preventDefault()

    updateVis(false)

    const response = await axios.post('/api/edit-tab-name', {id: id, body: newTabName })

  }

  const handleChange = (e) => {  

    updateNewTabName(e.target.value)  

    const newArray = tabs.map(x => {
      if(x.id === id) {
        return { ...x, title: e.target.value }     
      }
      return x 
    })
    updateTabs(newArray)
    
  }
  
  const popover = (
    <Popover id="popover-basic">  
      <Popover.Header as="h3">Rename Tab</Popover.Header> 
      <Popover.Body className='d-flex'>
        <Form.Control onChange={(e) => handleChange(e)}></Form.Control><Button onClick={editTabName} className='mx-2' variant='success'>&gt;</Button>
      </Popover.Body>
    </Popover>
  );


  
  return (
  <>
    <OverlayTrigger show={vis} trigger="click" placement="bottom" overlay={popover}>  
      <Button onClick={() => updateVis(!vis)} variant="primary"><CiEdit></CiEdit></Button>  
    </OverlayTrigger>
  </>)
};

export default MyPopover;