import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  return (
    <div className="flex gap-2">
      <Button variant='secondary' size='sm' text='Add content' onClick={() => {} } startIcon = {<PlusIcon size='lg'/>}/>
      <Button variant='primary' size='sm' text='Share content' onClick={() => {} } endIcon = {<ShareIcon size='lg'/>}/>
    </div>
  )
}

export default App
