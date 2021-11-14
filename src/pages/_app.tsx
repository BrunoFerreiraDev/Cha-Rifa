import '../../styles/globals.scss'
import { Context } from '../Context'

function MyApp({ Component, pageProps }) {
  return (
    <Context.Provider value={[]}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

export default MyApp
