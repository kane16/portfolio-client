import { buildStyles, CircularProgressbar } from "react-circular-progressbar"

export default function ProgressStatusIndicator({
  progress,
}: {
  progress: number
}) {
  if (progress <= 30) {
    return (
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textColor: "red",
          pathColor: "red",
          trailColor: "#d6d6d6",
        })}
        className="h-20 w-20"
      />
    )
  }

  if (progress < 100) {
    return (
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textColor: "yellow",
          pathColor: "yellow",
          trailColor: "#d6d6d6",
        })}
        className="h-20 w-20"
      />
    )
  }

  return (
    <CircularProgressbar
      value={progress}
      text={`${progress}%`}
      styles={buildStyles({
        textColor: "green",
        pathColor: "green",
        trailColor: "#d6d6d6",
      })}
      className="h-20 w-20"
    />
  )
}
