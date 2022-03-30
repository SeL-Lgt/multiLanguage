import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProjectManagementDetail() {
  const params = useParams();

  useEffect(() => {
    console.log(params);
    console.log(params.id);
  }, []);

  return <div style={{ margin: '10px' }}>{params.id}</div>;
}

export default ProjectManagementDetail;
