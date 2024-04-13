export const useShowErrorMessage = () => {
  return (error: unknown) => {
    alert(error instanceof Error ? error.message : error);
  };
};
