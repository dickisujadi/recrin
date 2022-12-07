import { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Code, Commit } from "../interfaces/typings";
import DataGridUi from '../ui/DataGrid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'repo_name', headerName: 'Repository Name', width: 260 },
  { field: 'author_name', headerName: 'Author Name', width: 200 },
  { field: 'commiter', headerName: 'Commiter Name', width: 200 },
  { field: 'message', headerName: 'Message', width: 800 },
];

export default function CommitPage() {
  const [commit, setCommit] = useState<Commit[]>([]);

  const fetchCommits = () => {
    fetch(`https://api.github.com/search/commits?q=repo:reactjs/reactjs.org+upgrade`)
    .then(response => response.json())
    .then(response => response.items)
    .then(response => {
      console.log(response);
      
      const res : Commit[] = response.map((item : any, index : number) => {
        return {
          id: index,
          repo_name: item.repository.name,
          author_name: item.author.login,
          commiter: item.committer.login,
          message: item.commit.message,
        }
      })
      setCommit(res);
    })
  }


  useEffect(() => {
    fetchCommits();
  }, [])
  return (
    <>
      <div className='Table-container'>
        <DataGridUi columns={columns} pageSize={10} rows={commit} key={'code'}/>
      </div>
    </>
  );
}
