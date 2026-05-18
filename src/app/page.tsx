export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Projeto Encerrado
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Infelizmente, este projeto foi descontinuado e não está mais disponível.
          </p>
        </div>
        
        <div className="border-t border-zinc-800 pt-6">
          <p className="text-zinc-500 text-sm">
            Agradecemos a todos que fizeram parte desta jornada.
          </p>
        </div>
      </div>
    </div>
  );
}
