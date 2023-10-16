import './App.css'

import "@aws-amplify/ui-react/styles.css"
import { Authenticator } from '@aws-amplify/ui-react'
import Movies from './movies/Movies'

const App = () => {
  return (
    <Authenticator socialProviders={["google"]} hideSignUp={true}>
      {({ signOut, user }) => (
        <Movies user={user!}></Movies>
      )}
    </Authenticator>
  )
}

export default App
