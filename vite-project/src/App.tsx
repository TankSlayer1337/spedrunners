import './App.css'

import "@aws-amplify/ui-react/styles.css"
import { Authenticator } from '@aws-amplify/ui-react'
import MovieList from './movies/MovieList'
import AddMovie from './movies/AddMovie'

const App = () => {
  return (
    <Authenticator socialProviders={["google"]} hideSignUp={true}>
      {({ signOut, user }) => (
        <>
          <AddMovie user={user!}></AddMovie>
          <MovieList user={user!}></MovieList>
        </>
      )}
    </Authenticator>
  )
}

export default App
