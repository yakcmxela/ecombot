export const ChatTyping = () => {
  return (
    <div className="flex space-x-1 justify-start items-center px-3">
      <div className="h-1 w-1 bg-slate-400 rounded-full animate-ping [animation-delay:-0.6s]"></div>
      <div className="h-1 w-1 bg-slate-400 rounded-full animate-ping [animation-delay:-0.45s]"></div>
      <div className="h-1 w-1 bg-slate-400 rounded-full animate-ping [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 bg-slate-400 rounded-full animate-ping [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 bg-slate-400 rounded-full animate-ping"></div>
    </div>
  );
};
