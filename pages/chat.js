import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import MessageSimple from '../src/components/messageSimple';
import ResponseMessage from '../src/components/ResponseMessage';

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function RefreshOnNewMessage(addMessage) {
  return supabaseClient
      .from('mensagens')
      .on('INSERT', ( res ) => {
        addMessage(res.new)
      })
      .subscribe();
}

export default function ChatPage() {
  // Sua lógica vai aqui
  const router = useRouter();

  const [mensagem, setMensagem] = useState('');
  const [chatList, setChatList] = useState([]);
  const [respondendo, setRespondendo] = useState('');

  const usuarioLogado = router.query.username;

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setChatList(data)
        console.log(data)
      })

    RefreshOnNewMessage((novaMensagem) => {
      setChatList((listaAtual) => {
        return [
          novaMensagem,
          ...listaAtual
        ]
      })
    });
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
      de: usuarioLogado,
      texto: novaMensagem,
      respondendo: respondendo.id
    }

    supabaseClient
      .from('mensagens')
      .insert([mensagem])
      .then(({ data }) => {
        console.log(data)
      })

    //esvaziar caixa
    setMensagem('')
    setRespondendo('')
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

          <MessageList mensagens={chatList} deletefunc={deleteMessage} usuarioLogado={usuarioLogado} setRespondendo={setRespondendo}/>

          {
            respondendo ? 
            (
            <Box 
              styleSheet={{
                backgroundColor: appConfig.theme.colors.neutrals[500],
                borderRadius: '6px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <Text styleSheet={{
                  fontSize: '12px',
                  paddingLeft: '10px'
                }}>
                Respondendo a <Text styleSheet={{
                  color: '#'+Math.floor(Math.random()*16777215).toString(16),
                  fontSize: '14px'
                  }}>{respondendo.de}</Text>
              </Text>
              <Text 
               onClick={() => setRespondendo('')}
               styleSheet={{
                borderRadius: '5px',
                padding: '3px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[400],
                }
              }}>X</Text>
            </Box>
            )
            :
            ''
          }
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
            <ButtonSendSticker onStickerClick={(sticker) => {
              handleNewMessage(':sticker: ' + sticker)
            }} />
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
  const usuarioLogado = props.usuarioLogado
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
          const respondendo = mensagemAtual.respondendo 
          return (
            !respondendo ? (
              <MessageSimple key={mensagemAtual.id} mensagemAtual={mensagemAtual} setRespondendo={props.setRespondendo} usuarioLogado={props.usuarioLogado} deletefunc={props.deletefunc}/>
            ) : (
              <ResponseMessage key={mensagemAtual.id} mensagemAtual={mensagemAtual} setRespondendo={props.setRespondendo} usuarioLogado={props.usuarioLogado} deletefunc={props.deletefunc}/>
            )
          )
        })
      }
    </Box>
  )
}