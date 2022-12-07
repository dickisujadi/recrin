import { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Code } from "../interfaces/typings";
import DataGridUi from '../ui/DataGrid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Name', width: 260 },
  { field: 'owner_name', headerName: 'Owner Name', width: 200 },
  { field: 'git_url', headerName: 'Git URL', width: 400 },
  { field: 'deployment_url', headerName: 'Deployment URL', width: 400 },
];

export default function CodePages() {
  const [codes, setCodes] = useState<Code[]>([]);

  const fetchCodes = () => {
    fetch(`https://api.github.com/search/code?q=language:js+repo:reactjs/reactjs.org`)
    .then(response => response.json())
    .then(response => response.items)
    .then(response => {
      console.log('resp', response)
      const res : Code[] = response.map((item : any, index : number) => {
        return {
            id: `${item.repository.id}${index}`,
            name: item.name,
            owner_name: item.repository.owner.login,
            git_url: item.git_url,
            deployment_url: item.deployments_url,
        }
      })
      console.log('res', res)
      setCodes(res);
    })
  }


  useEffect(() => {
    fetchCodes();
  }, [])
  return (
    <>
      <div className='Table-container'>
        <DataGridUi columns={columns} pageSize={10} rows={codes} key={'code'}/>
      </div>
    </>
  );
}
