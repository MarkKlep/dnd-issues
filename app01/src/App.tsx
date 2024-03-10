import { useState } from 'react';
import TodosLists from './components/todos-lists/TodosLists';
//import DeleteIcon from '@mui/icons-material/Delete';
import DialogFrame from './components/dialog-frame/DialogFrame';
import NavBar from './components/navbar/NavBar';
import LoadIssues from './components/load-issues/LoadIssues';
import './App.css';



function App() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <div>

      <NavBar
        setOpenDialog={setOpenDialog}
      />

      <LoadIssues/>

      <TodosLists />

      <DialogFrame
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />

    </div>
  );
}

export default App;