import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return(
    <article className="teacher-item">
      <header>
        <img src='https://avatars3.githubusercontent.com/u/41867280?s=460&u=474a02c10c9d59781e35653980047069187a43f8&v=4' alt='Avatar'/>

        <div>
          <strong>Antonio</strong>
          <span>Programação Estruturada</span>
        </div>
      </header>

      <p>Description</p>

      <footer>
        <p>
          Preço/Hora
        </p>
        <strong>R$ 100,00</strong>
        <button type='button'>
          <img src={whatsappIcon} alt='Entrar em contato'/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;