import { MovieEntry } from "./movie-entry";
import DisplayMovie from "./DisplayMovie";
import { useState } from "react";
import EditMovie from "./EditMovie";

const MovieListItem = ({ entry, onDelete }: { entry: MovieEntry, onDelete: Function }) => {
  const [displayEdit, setDisplayEdit] = useState<Boolean>();

  return (
    <div>
      {displayEdit ?
      <EditMovie movie={entry} onDelete={onDelete} setDisplayEdit={setDisplayEdit}></EditMovie> :
      <DisplayMovie entry={entry} setDisplayEdit={setDisplayEdit}></DisplayMovie>}
    </div>
  )
}

export default MovieListItem;