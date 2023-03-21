import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form'; 
import Card from 'react-bootstrap/Card'; 
import { useState } from 'react';
const axios = require('axios');






function TabComponent({tab}) {
  
   
  const [tabs, updateTabs] = useState(tab)
  const [notes, updateNotes] = useState([])
  const [loading, updateLoading] = useState(false)

  const [tabName, updateTabName] = useState('')
  const [noteBody, updateNoteBody] = useState('')
  const [currentTab, updateCurrentTab] = useState(null)  
  const [currentTabName, updateCurrentTabName] = useState('')  

  const handleChange = (e) => {
    e.preventDefault()
    updateTabName(e.target.value)
  }

  const handleNoteChange = (e) => {
    e.preventDefault()
    
    updateNoteBody(e.target.value) 
    console.log(noteBody)
  }

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    const response = await axios.post('/api/create-tab', {name: tabName})
    console.log(response.data)
    updateTabs([...tabs, response.data.notes])
    updateTabName('')
  } 

  const handleSubmitNote = async (e) =>  {
    e.preventDefault()

    const newNote = { id: null, tabId: currentTab, body: noteBody } 
    updateNotes([...notes, newNote]) 
    updateNoteBody('')
    const response = await axios.post('/api/create-note', { body: noteBody, tabId: parseInt(currentTab) })
    
    const data = await axios.post('/api/get-tabs', { id: parseInt(currentTab) }) 
    console.log(data.data.notes)
    
    updateNotes(data.data.notes)
    
  } 

  const getData = async (e) => {
    updateCurrentTab(e.target.id)
    updateCurrentTabName(e.target.innerText) 
    updateLoading(true)
    console.log(e.target.id)
    const data = await axios.post('/api/get-tabs', {id: parseInt(e.target.id)}) 
    console.log(data.data.notes)
    updateNotes(data.data.notes)
    updateLoading(false)
  }

  const handleDeleteTab = async (id) => {
    // const newArray = myState.filter(x => x.id !== id)  
    // setMyState(newArray) 

    // console.log(myState) 

    
    const newArray = tabs.filter(x => x.id !== id)  
    console.log( `newArray is ${newArray}`) 
    updateTabs(newArray) 
    updateCurrentTab(null)
    const deleted = await axios.post('api/delete-tab', {id: parseInt(id)}) 

  }

  const handleDeleteNote = async (id) => {
    
    updateNotes(notes.filter(x => x.id !== id))
    const response = await axios.post('/api/delete-note', { id: parseInt(id)})
    updateNoteBody('')
    console.log(notes)
  }

  console.log(tab)
  return (
    <><Tab.Container id="left-tabs-example" defaultActiveKey="first">   
      <Row className='d-flex flex-row'>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column m-4">  
          {tabs.map(x =>  
            <div>  
              <ButtonGroup className='w-50'>  
                <Button variant='light' style={{width: '200px'}} onClick={(e) => getData(e)} prop={[x.notes]} id={x.id}>{x.title}</Button> 
                <Button variant='primary'>edit</Button> 
                <Button id={x.id} onClick={() => handleDeleteTab(x.id)} variant='danger'>x</Button> 
              </ButtonGroup>   
            </div>)}  

            <div className='my-2'>  
            <Form.Control style={{width: '100px'}} onChange={(e) => handleChange(e)} type="text"  placeholder="New Tab Name" value={tabName} /> 
            <Button onClick={(e) => handleSubmit(e)} variant='success' className='btn rounded'>Add Tab</Button>  
            </div>
            
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className='p-4'> 
            <Card>
              { currentTab ? <Card.Body>
                <h1>{currentTabName}</h1>
                {  notes.map(x => <p>{x.body} <span style={{color: 'red', cursor: 'pointer', fontWeight: 'bold'}} id={x.id} onClick={() => handleDeleteNote(x.id)}>x</span></p>) } 

                <Form.Control style={{width: '100px'}} onChange={(e) => handleNoteChange(e)} type="text"  placeholder="New Note" value={noteBody} />
                <Button onClick={(e) => handleSubmitNote(e)} variant='success' className='btn rounded my-2'>Add Note</Button>
              </Card.Body> : <div className='m-5'><h2>Welcome to Notes App</h2><p className='my-3'>Click a tab to see related notes, or create a new tab to create notes of your own.</p></div> } 
            </Card>
          </Tab.Content> 
        </Col> 
      </Row> 
    </Tab.Container>  

    </>  
  );
}


export default TabComponent; 