import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNzkyNCwiZXhwIjoxOTU4ODgzOTI0fQ.t79QkfUl16ZA0pISXFhGFzjKUHEbfrLG76ZcH76tdMM'
const SUPABASE_URL = 'https://lphvgtqtnnnkaruveaxe.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = useState('');
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const supabaseDados = supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setChatList(data)
      })
  }, []);
  

  function deleteMessage(id){
    let novaLista = chatList;

    novaLista = novaLista.filter(elemento => {
      if(elemento.id !== id){
        return true
      }else{
        return false
      }
    })
    setChatList(novaLista)
  }

  function handleNewMessage(novaMensagem) {
    //enviar texto
    const mensagem = {
      // id: chatList.length + 1,
      de: 'vanessametonini',
      texto: novaMensagem
    }

    supabaseClient
      .from('mensagens')
      .insert([mensagem])
      .then(({ data }) => {
        setChatList([
          data[0],
          ...chatList
        ])
      })

    //esvaziar caixa
    setMensagem('')
  }

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
        border: '2px solid',
        borderColor: appConfig.theme.colors.neutrals[800],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList mensagens={chatList} deletefunc={deleteMessage} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={e => {
                setMensagem(e.target.value);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()

                  handleNewMessage(mensagem)
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {
        props.mensagens.map((mensagemAtual) => {
          return (
            <Text
              key={mensagemAtual.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '8px',
                marginBottom: '12px',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                }
              }}
            >
              <Box
                styleSheet={{
                  justifyContent: 'space-between',
                  display: 'flex'
                }}
              >
                <Box>
                  <Image
                    styleSheet={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                    src={`https://github.com/${mensagemAtual.de}.png`}
                  />
                  <Text tag="strong">
                    {mensagemAtual.de}
                  </Text>
                  <Text
                    styleSheet={{
                      fontSize: '10px',
                      marginLeft: '8px',
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {(new Date().toLocaleDateString())}
                  </Text>
                </Box>
                <Text
                  tag='strong'
                  onClick={() => props.deletefunc(mensagemAtual.id)}
                  styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    hover: {
                      backgroundColor: appConfig.theme.colors.neutrals[777],
                    }
                  }}
                >X</Text>
              </Box>
              {mensagemAtual.texto}
            </Text>
          )
        })
      }
    </Box>
  )
}