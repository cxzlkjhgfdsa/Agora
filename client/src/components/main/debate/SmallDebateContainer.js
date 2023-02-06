import DebateContainer from "./DebateContainer";

function SmallDebateContainer({ url }) {
  return (
    <DebateContainer
    maximumVisibleCounts={4}
    minimumVisibleCounts={3}
    type=""
    url={url}
    bgColor="white"
    slidePerClick={3}
    />
  )
}

export default SmallDebateContainer;