import { ModalCadastrar } from '../components/ModalCadastrar';
import { ModalProvider } from '../ModalProvider'
import Modal from 'react-modal'
import '../../styles/globals.scss'
Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }) {

  return (
    <ModalProvider >
      <ModalCadastrar />
      <Component {...pageProps} />

    </ModalProvider>
  )
}

export default MyApp
