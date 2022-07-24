import { CircularProgress } from "@mui/material";

const LoadingComponent = ({ className }: { className?: string }) => {
  return (
    <div className={`grid h-full w-full place-items-center ${className}`}>
      <CircularProgress />
    </div>
  );
};

export default LoadingComponent;
