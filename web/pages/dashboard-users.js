import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import DashboardMenu from '../components/DashboardMenu';
import Modal from '../components/Modal';

import styles from '../styles/dashboard-users.module.css';
import ActionButtons from '../components/ActionButtons';
import api from '../services/api';

function DashboardAffiliates() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idEditUser, setIdEditUser] = useState(0);
  const [emailEditUser, setEmailEditUser] = useState('')

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState('USER');

  const { user } = JSON.parse(localStorage.getItem('userInfo'));

  const fetchUsers = async () => {
    const res = await api.get(`api/users/index-users`);
    const usersRes = await res.data;
    setUsers(usersRes);
    return;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSingUp = async () => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    const emailLowerCase = email.toLocaleLowerCase();

    if (!regexEmail.test(emailLowerCase)) {
      alert('Digite um email válido');
      return;
    }

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      alert('Você precisa preencher todos os campos!');
      return;
    }

    const res = await api.post(`api/users/signup`, {
      name,
      email: emailLowerCase,
      password
    });

    alert('Usuário Cadastrado com sucesso!');
    setIsOpen(false);
    setIsNewUser(false);
    fetchUsers();
  };

  const handleEditUser = async (id) => {
    setIsOpen(true);
    setIsNewUser(false);
    setIsEdit(true);

    if (user.role === 'USER') {
      if (user.id !== id) {
        alert('Você pode editar somente o seu registro.');
        return;
      }

      try {
        const res = await api.put('api/users/update-user', {
          email: user.email,
          password,
          newPassword
        });

        alert('Informações alteradas com sucesso!');
        setIsOpen(false);
        setIsEdit(false);
        fetchUsers();
        return;
      } catch (err) {
        console.log(err);
        alert('Informações inválidas. cod.01');
        return;
      }
    }

    try {
      const res = await api.put('api/users/update-user', {
        email: emailEditUser,
        newPassword,
        role
      });
      alert('Informações alteradas com sucesso!');
      setIsOpen(false);
      setIsEdit(false);
      fetchUsers();
      return;
    } catch (err) {
      console.log(err);
      alert('Informações inválidas. cod.02');
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Gerenciamento de usuários - Super Oferta do Dia</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      {isOpen && (
        <Modal onClickCloseModal={() => setIsOpen(false)}>
          {isNewUser && (
            <>
              <h2>Cadastrar novo usuário</h2>
              <input
                type='text'
                placeholder='Nome'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='text'
                placeholder='E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Senha - min. 8 caracteres'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='button' onClick={handleUserSingUp}>
                Cadastrar
              </button>
            </>
          )}
          {isEdit && (
            <>
              <h2>Editar usuário</h2>
              {user.role !== 'ADMIN' && (
                <input
                  type='password'
                  placeholder='Senha antiga'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}

              <input
                type='password'
                placeholder='Nova senha'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              {user.role === 'ADMIN' && (
                <>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value='USER'>USER</option>
                    <option value='ADMIN'>ADMIN</option>
                  </select>
                </>
              )}
              <button type='button' onClick={() => handleEditUser(idEditUser)}>
                Salvar
              </button>
            </>
          )}
        </Modal>
      )}

      <div className={styles.content}>
        <DashboardMenu />
        <div className={styles.offersContent}>
          <h1>Gerenciamento de usuários</h1>
          <button
            type='button'
            className={styles.newOfferButton}
            onClick={() => {
              setIsOpen(true);
              setIsNewUser(true);
              setIsEdit(false);
            }}
          >
            NOVO USUÁRIO
          </button>

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th style={{ width: 50 }}>id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Permissão</th>
                <th style={{ width: 80 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id} className={styles.tableData}>
                    <td style={{ width: 50, textAlign: 'center' }}>
                      {user.id}
                    </td>
                    <td style={{ width: 200 }}>{user.name}</td>
                    <td style={{ width: 200 }}>{user.email}</td>
                    <td style={{ width: 100 }}>{user.role}</td>
                    <td className={styles.actionContainer}>
                      <ActionButtons
                        users
                        onClickEdit={() => {
                          setIsOpen(true);
                          setIsEdit(true);
                          setIsNewUser(false);
                          setIdEditUser(user.id)
                          setEmailEditUser(user.email);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DashboardAffiliates;
