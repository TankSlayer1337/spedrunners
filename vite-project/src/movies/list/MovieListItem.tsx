import { AmplifyUser } from "@aws-amplify/ui";
import { MovieEntry } from "../interfaces/movie-entry";
import DisplayMovie from "./DisplayMovie";
import { useState } from "react";
import EditMovie from "./EditMovie";

const MovieListItem = ({ user, entry, onEdit }: { user: AmplifyUser, entry: MovieEntry, onEdit: Function }) => {
  const [displayEdit, setDisplayEdit] = useState<Boolean>();

  return (
    <div>
      {displayEdit ?
        <EditMovie user={user} movie={entry} onEdit={onEdit} setDisplayEdit={setDisplayEdit}></EditMovie> :
        <DisplayMovie entry={entry} setDisplayEdit={setDisplayEdit}></DisplayMovie>}
    </div>
  )
}

export default MovieListItem;