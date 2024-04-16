export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return (
    (hours ? `${hours}h ` : "") +
    `${minutes.toString().padStart(2, "0")}m ` +
    `${seconds.toString().padStart(2, "0")}s`
  );
};
