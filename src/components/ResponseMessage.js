import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import react, { useEffect, useState } from 'react';
import appConfig from '../../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ResponseMessage(props) {
  const mensagemAtual = props.mensagemAtual
  const usuarioLogado = props.usuarioLogado
  const date = mensagemAtual.created_at.split('T')
  const time = date[1].split('+')

  const [mensagemRespondida, setMensagemRespondida] = useState('');

  useEffect(() => {
    getMessageData();

  }, []); 

  let de;

  function getMessageData() {
    const id = mensagemAtual.respondendo;
    supabaseClient.from('mensagens').select('*').eq('id', id).then(({ data }) => {
      setMensagemRespondida(data[0])
      console.log(mensagemRespondida)
      de = data.de
    })
  }

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
      {/* Caixa para mostrar a quem está respondendo */}
      <Box
        styleSheet={{
          display: 'flex',
          justifyContent: 'left',
          backgroundColor: appConfig.theme.colors.neutrals[400],
          padding: '3px 6px',
          borderRadius: '10px',
          marginBottom: '3px'
        }}
      >
        {
          mensagemRespondida.de && mensagemRespondida.de ? (
            <>
              &#10548;
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                  marginLeft: '10px'
                }}
                src={'https://github.com/' + mensagemRespondida.de + '.png'}
              />
              <Text
                tag="strong"
                styleSheet={{
                  fontSize: '12px',
                  color: '#'+Math.floor(Math.random()*16777215).toString(16),
                  paddingRight: '6px',
                }}>
                @{mensagemRespondida.de}: 
              </Text>
              {
                mensagemRespondida.texto && mensagemRespondida.texto.startsWith(':sticker:')
                  ? (
                    <Image styleSheet={{
                      width: '24px',
                      height: '24px'
                    }}
                      src={mensagemRespondida.texto.replace(':sticker:', '')} />
                  ) : (
                    <Text styleSheet={{
                      fontSize: '12px'
                    }}>{mensagemRespondida.texto}</Text>
              )}
            </>
          ) : ''
        }
      </Box>

      {/* Mensagem escrita em resposta */}
      <Box
        styleSheet={{
          justifyContent: 'space-between',
          display: 'flex'
        }}
      >
        <Box
          styleSheet={{
            paddingBottom: '10px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Image
            styleSheet={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'inline-block',
              marginRight: '8px',
            }}
            src={`https://github.com/${usuarioLogado}.png`}
          />
          <Text
            tag="strong"
          >
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
            {date[0]}  {time[0]}
          </Text>
        </Box>
        <Box>
          <Text
            tag='strong'
            onClick={() => props.setRespondendo(mensagemAtual)}
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              fontSize: '14px',
              cursor: 'pointer',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[400],
              }
            }}
          >&#10549;</Text>
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
      </Box>
      {
        mensagemAtual.texto.startsWith(':sticker:')
          ? (
            <Image src={mensagemAtual.texto.replace(':sticker:', '')} />
          ) : (
            mensagemAtual.texto
          )}
    </Text>
  )
}