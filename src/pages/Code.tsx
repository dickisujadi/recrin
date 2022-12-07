import { useEffect, useState, useRef } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Code } from "../interfaces/typings";
import DataGridUi from '../ui/DataGrid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'owner_name', headerName: 'Owner Name', width: 260 },
  { field: 'repo_name', headerName: 'Repo Name', width: 200 },
  { field: 'git_url', headerName: 'Git URL', width: 800 },
];

export default function CodePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [codes, setCodes] = useState<Code[]>([]);

  const throttling = useRef(false);

  const handleThrottleSearch = () => {
    console.log(inputRef.current?.value)
    if (throttling.current) {
      return
    }
    throttling.current = true
    if(inputRef && inputRef.current) {
      setTimeout(() => {
        throttling.current = false
        fetch(`https://api.github.com/search/code?q=repo:${inputRef.current == null? '' : inputRef.current.value }`)
          .then(async response => {
            if (!response.ok) {
              setCodes([]);
            } else {
              const data = await response.json()
              console.log('tes', data)
              const res : Code[] = data.items.map((item : any, index : number) => {
                return {
                    id: `${item.repository.id}${index}`,
                    owner_name: item.repository.owner.login,
                    repo_name: item.repository.full_name,
                    git_url: item.git_url,
                    deployment_url: item.deployments_url,
                }
              })
              setCodes(res);
            }
          })
          .catch(err => {
            console.error(err)
          })
      }, 1000)
    }
  }

  return (
    <>
      <div>
        <input 
          type="text"
          ref={inputRef}
          onChange={handleThrottleSearch}
          className="search-input"
          placeholder='Input Repo Name'
        />
      </div>
      <div className='Table-container'>
        <DataGridUi columns={columns} pageSize={10} rows={codes} key={'code'}/>
      </div>
    </>
  );
}
