import { Box, Text, Image, } from '@skynexui/components';
import React, { useEffect, useState, useRef } from 'react';
import appConfig from '../../config.json';
import useOutsideClick from '../Hooks/ClickOutsideElement';

//https://api.github.com/users/${login}

export default function ProfileNameCard({name}) {
  const [isOpen, setOpenState] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [githubData, setGithubData] = useState({});
  const PerfilCard = useRef()

  useEffect(() => {
    getGithubData();
  }, []);
  
  async function getGithubData(){
    const res = await fetch(`https://api.github.com/users/${name}`)
                .then(response => response.json())
                .then(response => {return response})
    
    setGithubData(res)
    console.log(res)
  }

  const handleMouseClick = (e) => {
    setOpenState(!isOpen);
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  }

  useOutsideClick(PerfilCard, () => {
    if(isOpen){
      setOpenState(false)
    }
  })
  
  return(
    <>
    <Text 
     tag='strong' 
     onClick={(e) => {handleMouseClick(e)}}
     styleSheet={{
       cursor: 'pointer',
       position: 'relative',
     }}
     >{name}</Text>
     {
      isOpen && (
        <div ref={PerfilCard}>
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: '200px',
              sm: '240px',
            },
            left: mouseX + 40 + 'px',
            top: mouseY - 310 + 'px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
        >
          <Box
           styleSheet={{
            backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16),
            height: '70px',
            borderRadius: '10px'
           }}
          ></Box>
          <a target="_blank" href={githubData.html_url}
            style={{textDecoration: 'none'}}
            >
            <Image 
            styleSheet={{
              height: '70px',
              width: '70px',
              borderRadius: '50%',
              position: 'absolute',
              top: '11%',
              left: '8%',
              cursor: 'pointer',
              hover: {
                filter: 'grayscale(0.2)',
              }
            }}
            src={githubData.avatar_url}
            />
          </a>
          <Box
           styleSheet={{
             padding: '16px',
             marginTop: '30px',
             display: 'flex',
             flexDirection: 'column',
           }}
          >
            <Text
            tag='strong'
            styleSheet={{
              fontSize: '20px',
              fontWeight: '700'
            }}
            >{githubData.name}
            </Text>
            <Text
              styleSheet={{
                fontSize: '12px',
                color: appConfig.theme.colors.neutrals[300],
                fontWeight: '500'
              }}
            >{githubData.login}  
            </Text>
            <Box
             styleSheet={{
               backgroundColor: appConfig.theme.colors.neutrals[400],
               height: '1px',
               width: '100%',
               marginTop: '15px'
             }}
            />
            <Text
              styleSheet={{
                fontWeight: '700',
                color: appConfig.theme.colors.neutrals[100],
                fontSize: '18px',
                marginTop: '8px'
              }}
            >Sobre mim:
            </Text>
            <Text
              styleSheet={{
                fontSize: '14px',
                color: appConfig.theme.colors.neutrals[300],
                padding: '4px 0'
              }}
            >{githubData.bio}
            </Text>
            <Text
              styleSheet={{
                fontSize: '14px',
                color: appConfig.theme.colors.neutrals[300],
                padding: '4px 0'
              }}
            >Empresa: {githubData.company}
            </Text>
            <Text
              styleSheet={{
                fontSize: '14px',
                color: appConfig.theme.colors.neutrals[300],
                padding: '4px 0'
              }}
            >Seguidores: {githubData.followers}
            </Text>
            <Text
              styleSheet={{
                fontSize: '14px',
                color: appConfig.theme.colors.neutrals[300],
                padding: '4px 0'
              }}
            >Seguindo: {githubData.following}
            </Text>
            <Text
              styleSheet={{
                fontSize: '14px',
                color: appConfig.theme.colors.neutrals[300],
                padding: '4px 0'
              }}
            >Repositórios: {githubData.public_repos}
            </Text>
          </Box>
        </Box>
        </div>
      )
     }
    </>
  )
}