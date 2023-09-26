const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-800 border-opacity-25"></div>
    </div>
  );
};
export default Loader;
