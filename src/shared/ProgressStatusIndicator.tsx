import { CircularProgressbar } from "react-circular-progressbar"


export default function ProgressStatusIndicator(
  { progress }: { progress: number }
) {
  return <CircularProgressbar value={progress} text={`${progress}%`} className="h-20 w-20" />;
}