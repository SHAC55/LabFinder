const LoadingState = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
        >
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-3 h-6 w-64 rounded bg-slate-200" />
          <div className="mt-8 h-4 w-40 rounded bg-slate-200" />
          <div className="mt-3 h-8 w-28 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
};

export default LoadingState;