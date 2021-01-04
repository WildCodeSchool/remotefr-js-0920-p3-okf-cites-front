import React from 'react';
import { useParams } from 'react-router-dom';

export default function Species() {
  const { id } = useParams();

  return <h1>Species ({id}) Page</h1>;
}
