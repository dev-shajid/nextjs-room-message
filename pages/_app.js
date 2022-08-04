import { useEffect, useState } from 'react';
import Nav from '../components/Nav'
import ContextProvider from '../context'
import '../styles/globals.css'
import SocketIOClient from "socket.io-client";

function MyApp({ Component, pageProps }) {

  return (
    <ContextProvider>
      {/* <Nav/> */}
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
