import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import react from 'react';
import appConfig from '../../config.json';

export default function MessageSimple(props){
  const mensagemAtual = props.mensagemAtual
  const usuarioLogado = props.usuarioLogado
  const date = mensagemAtual.created_at.split('T')
  const time = date[1].split('+')

  console.log(props)

  return(
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
      {mensagemAtual.texto.startsWith(':sticker:')
      ? (
        <Image src={mensagemAtual.texto.replace(':sticker:', '')} />
      ) : (
        mensagemAtual.texto
      )}
    </Text>
  )
}