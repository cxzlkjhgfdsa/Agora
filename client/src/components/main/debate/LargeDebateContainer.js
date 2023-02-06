import DebateContainer from "./DebateContainer";

function LargeDebateContainer({ url }) {
  return (
    <DebateContainer
    maximumVisibleCounts={3}
    minimumVisibleCounts={2}
    type="hot-thumbnail"
    url={url}
    bgColor="black"
    slidePerClick={1}
    />
  )
}

export default LargeDebateContainer;