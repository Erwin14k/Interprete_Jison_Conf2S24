import 'bootstrap/dist/css/bootstrap.min.css';
import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
function App() {
  const [editorValue, setEditorValue] = useState('// Code here');
  const [outputValue, setOutputValue] = useState('// Output will appear here');
  const[symbols,setSymbols]=useState([]);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor; // Store the editor instance for the original editor
  }


  function clean(){
    setOutputValue("");
  }

  // Petition to execute the interpreter
  const compile = async () => {
    if (editorRef.current) {
      // Obtain the entry text
      const value = editorRef.current.getValue();  
      const response = await fetch("http://localhost:3080/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "entrada": value }),
      });
  
      const data = await response.json();
      console.log(data)
      setOutputValue(data.output); // Update the output
      getVariables();
    }
  };

  // Petition to obtain all the symbols
  const getVariables = async () => {
    const response = await fetch("http://localhost:3080/symbols", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Logs from the backend
    const logs = await response.json();
    console.log(logs);
    const processedSymbols = [];
    Object.keys(logs).forEach((scope) => {
      Object.keys(logs[scope]).forEach((symbol) => {
        processedSymbols.push({
          simbolo: symbol,
          valor: logs[scope][symbol].value,
          linea: logs[scope][symbol].line,
          columna: logs[scope][symbol].column,
          ambito: scope,
        });
      });
    });

    setSymbols(processedSymbols); // Save the simbols
    return logs;
  };

  return (
    <div className=''>
      <div className='title'>Mi primer intérprete CONF_2S24</div>
      <div className=''>
        <button 
          onClick={compile} 
          className="button" 
          style={{ transition: 'all 2s' }}
        >
          Interpret
        </button>
        <button 
          onClick={clean} 
          className="button" 
          style={{ transition: 'all 2s', marginLeft:"20px"}}
        >
          clean output
        </button>
        <hr></hr>
        <div className='w-full rounded-xl'>
          {/* Container for editors with space between them */}
          <div className='flex flex-col gap-4'>
            {/* Original Editor */}
            <Editor
              height="60vh"
              language="java"
              value={editorValue}
              onMount={handleEditorDidMount}
              className={'rounded-xl'}
              theme="vs-dark"
              options={{fontSize:24}}
            />
            <br></br>
            {/* Read-only Editor with a margin or padding */}
            <Editor
              height="60vh"
              language="markdown"
              value={outputValue}
              options={{ readOnly: true,fontSize:24 }} // Make the second editor read-only
              className={'rounded-xl'}
              theme="vs-dark"
            />
          </div>
        </div>
      </div>
      <div>
      <h1>Tabla de Símbolos</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Simbolo</th>
            <th>Valor</th>
            <th>Línea</th>
            <th>Columna</th>
            <th>Ámbito</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map((symbol, index) => (
            <tr key={index}>
              <td>{symbol.simbolo}</td>
              <td>{symbol.valor}</td>
              <td>{symbol.linea}</td>
              <td>{symbol.columna}</td>
              <td>{symbol.ambito}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
}

export default App;