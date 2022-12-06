import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Repository from './Repository';


export default function Dashboard() {
  return (
    <>
      <Header menuName='Repositories' />
      <Repository />
    </>
  );
}
