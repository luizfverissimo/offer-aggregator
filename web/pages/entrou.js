import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

function Entrou() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      Entrou!
      <button type='button' onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Entrou;
