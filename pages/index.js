import Appconfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useState } from 'react';
import { useRouter } from 'next/router'

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${Appconfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

export default function PaginaInicial() {
  const [username, setUsername] = useState('TheSupereor');
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: Appconfig.theme.colors.primary[200],
          backgroundImage: 'url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: Appconfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              router.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas, Concordante!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: Appconfig.theme.colors.neutrals[200] }}>
              {Appconfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: Appconfig.theme.colors.neutrals[777],
                  mainColor: Appconfig.theme.colors.neutrals[900],
                  mainColorHighlight: Appconfig.theme.colors.primary[500],
                  backgroundColor: Appconfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: Appconfig.theme.colors.neutrals["000"],
                mainColor: Appconfig.theme.colors.primary[500],
                mainColorLight: Appconfig.theme.colors.primary[800],
                mainColorStrong: Appconfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: Appconfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: Appconfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: Appconfig.theme.colors.neutrals[200],
                backgroundColor: Appconfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
        <Box
            styleSheet={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: 'auto',
              height: '275px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: Appconfig.theme.colors.neutrals[700],
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                marginTop: '25px'
              }}
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjQ7D9lBGLOXwahfYPF3j0q9UKiwH04kOwC_BzWP6nEQ6wHXeus5STZ8zITfybmznB_k&usqp=CAU`}
            />
          </Box>
      </Box>
    </>
  );
}