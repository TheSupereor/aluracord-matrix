import { Box, Text, Image } from '@skynexui/components';
import react, { useEffect, useState } from 'react';
import appConfig from '../../config.json';


export default function ResponseMessage({name}) {
  const [isOpen, setOpenState] = React.useState('');
  
  return (
    <>
    <Text tag='strong' onClick={() => {console.log('deu certo')}}>name</Text>
    {/* {
      isOpen && (

      )
    } */}
    </>
  )
}