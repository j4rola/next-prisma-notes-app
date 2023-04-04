import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MyPopover from './MyPopover';    
import Form from 'react-bootstrap/Form'; 
import Card from 'react-bootstrap/Card'; 
import { useState } from 'react'; 
const axios = require('axios'); 






function TabComponent({ tab, note }) {
  
  const [tabs, updateTabs] = useState(tab)
  const [notes, updateNotes] = useState(note)
  const [currentNotes, updateCurrentNotes] = useState([])
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
    const response = await axios.post('/api/create-tab', { name: tabName })   
    console.log(response.data)
    updateTabs([...tabs, response.data.tab])        
    updateTabName('')  
    updateCurrentTab(response.data.tab.id)  
    updateCurrentTabName(response.data.tab.title)  
    updateCurrentNotes([])  

  } 

  const handleSubmitNote = async (e) =>  {   

    e.preventDefault()
    
    const newNote = {id: null, tabId: parseInt(currentTab), body: noteBody } 
    updateNotes([...notes, newNote]) 
    // console.log(notes)
    // console.log(note)
    updateCurrentNotes([...currentNotes, newNote])
    updateNoteBody('')
    const response = await axios.post('/api/create-note', { body: noteBody, tabId: parseInt(currentTab) })  
    const data = await axios.post('/api/get-tabs', { id: parseInt(currentTab) }) 
    updateCurrentNotes(data.data.notes)  
    updateNotes([...notes, response.data.notes])   
    
  } 

  const getData = async (e) => {

    updateCurrentTab(e.target.id)
    updateCurrentTabName(e.target.innerText)   
    updateCurrentNotes(notes.filter(x => x.tabId === parseInt(e.target.id)))

  }  
  
  const handleDeleteTab = async (id) => {   

    console.log(tabs)
    const newArray = tabs.filter(x => x.id !== parseInt(id))   
    updateTabs(newArray) 
    console.log(tabs)
    updateCurrentTab(null) 
    const deleted = await axios.post('api/delete-tab', {id: parseInt(id)})  
    
  }

  const handleDeleteNote = async (id) => {

    updateCurrentNotes(currentNotes.filter(x => x.id !== parseInt(id)))
    updateNotes(notes.filter(x => x.id !== parseInt(id)))
    const response = await axios.post('/api/delete-note', { id: parseInt(id)})
    updateNoteBody('')

  }

  
  return (
    <><div className='d-flex flex-column justify-content-center p-5'>   
      <Row >
        <Col  sm={5}>
          <div className='d-flex flex-column align-items-center'>  
            <div>
            { tabs.map(x =>  
              
              <div key={x.id}>   
                <ButtonGroup key={x.id}  className='my-1'>  
                  <Button variant='light' style={{width: '160px'}} onClick={(e) => getData(e)}  id={x.id}>{x.title}</Button> 
                  <MyPopover tabs={tabs} updateTabs={updateTabs} variant='primary' id={x.id}>edit</MyPopover> 
                  <Button id={x.id} onClick={() => handleDeleteTab(x.id)} variant='danger'>x</Button> 
                </ButtonGroup>   
              </div>)}  

              <div className='mt-2 mb-5'>  
                <Form.Control style={{width: '160px'}} onChange={(e) => handleChange(e)} type="text"  placeholder="New Tab Name" value={tabName} /> 
                <Button onClick={(e) => handleSubmit(e)} variant='success' className='btn rounded mt-2'>Add Tab</Button>  
              </div>
              </div>
          </div>
          
        </Col>
        <Col sm={7}>
          <div className=' mr-5 d-flex flex-column justify-content-start'>   
            <Card>
              { currentTab ? <Card.Body>
                <h1>{currentTabName}</h1>
                { currentNotes[0] ? currentNotes.map(x => <p key={x.id}>{x.body}<span style={{color: 'red', cursor: 'pointer', fontWeight: 'bold'}} id={x.id} onClick={() => handleDeleteNote(x.id)}> x</span></p>): <p>No notes yet.</p> } 

                <Form.Control style={{width: '150px'}} onChange={(e) => handleNoteChange(e)} type="text"  placeholder="New Note" value={noteBody} />
                <Button onClick={(e) => handleSubmitNote(e)} variant='success' className='btn rounded my-2'>Add Note</Button>
              </Card.Body> : <div className='m-5'><h2>Welcome to Tabbed Notes</h2><p className='my-3'>Click a tab to see related notes, or create a new tab to create notes of your own.</p></div> } 
            </Card> 
          </div> 
        </Col> 
      </Row> 
    </div>  
    </>  
  );
}


export default TabComponent;   

