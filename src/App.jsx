import {IconA, IconB} from './components/Icon'
import Image from './components/Image'
import Header from './components/Header'
import './App.css'

function App() {

  const imageURL = "https://cdn2.shopclues.com/images/thumbnails/79835/320/320/104787525124666394ID1006929615021796911502242942.jpg"

  return (
    <>
      <Header />
      Hello World<br />
      <IconA />
      <IconB />
      {imageURL}<br />
      <Image ImageURL={imageURL} />
    </>
  )
}

export default App
