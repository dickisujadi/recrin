import { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Repository, RepositoryTable } from "../interfaces/typings";
import DataGridUi from '../ui/DataGrid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'username', headerName: 'User Name', width: 260 },
  { field: 'name', headerName: 'Repository Name', width: 260 },
  {
    field: 'watchers_count',
    headerName: 'Watchers Count',
    type: 'number',
    width: 150,
  },
  {
    field: 'forks_count',
    headerName: 'Forks Count',
    type: 'number',
    width: 150,
  },
  {
    field: 'stargazers_count',
    headerName: 'Stargazers Count',
    type: 'number',
    width: 150,
  },
];

export default function RepositoryPages() {
  const [repositories, setRepositories] = useState<RepositoryTable[]>([]);

  const fetchRepositories = () => {
    fetch(`https://api.github.com/search/repositories?q=sort=stars&order=desc&type=Repositories`)
    .then(response => response.json())
    .then(response => response.items)
    .then(response => {
      const res : RepositoryTable[] = response.map((item : Repository) => {
        return {
          id: item.id,
          username: item.owner.login,
          name: item.name,
          watchers_count: item.watchers_count,
          forks_count: item.forks_count,
          stargazers_count: item.stargazers_count
        }
      })
      setRepositories(res);
    })
    .catch(error => console.log(error))
  }


  useEffect(() => {
    fetchRepositories();
  }, [])
  return (
    <>
      <div className='Table-container'>
        <DataGridUi columns={columns} pageSize={10} rows={repositories} key={'repository'}/>
      </div>
    </>
  );
}
