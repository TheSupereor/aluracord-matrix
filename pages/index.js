import AppConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}

function Titulo(props){
  const Tag = props.tag || 'h1';
  return(
    <>
      <Tag>{props.children}</Tag>

    </>
  )
}

function HomePage(){
  return (
    <div>
      <h1>Bem-vindo, Concordante!</h1>
      <p>Concord - Alura Imersion</p>
    </div>
  )
}

export default HomePage;