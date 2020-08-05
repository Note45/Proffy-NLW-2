import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    })
  }
  
  return(
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt='Avatar'/>

        <div>
          <strong>{teacher.name}</strong>
          <span>Programação Estruturada</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/Hora
        </p>
        <strong>{`R$ ${teacher.cost}`}</strong>
        <a 
          target='_blank' 
          rel="noopener noreferrer" 
          onClick={createNewConnection} 
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt='Entrar em contato'/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;