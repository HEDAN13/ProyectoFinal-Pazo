import "./Loading.css";
import { PuffLoader } from "react-spinners";

export default function Loading({ loading }) {
  return (
    <div className="loading">
      <PuffLoader
        size={150}
        loading={loading}
        speedMultiplier={1}
        color="var(--primary-text-color)"
      />
    </div>
  );
}
