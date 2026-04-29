function AnimatedBackground({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0f0c29]">
            <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse" />
            <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse" />
            <div className="absolute w-60 h-60 bg-indigo-400 rounded-full blur-3xl opacity-20 top-1/2 left-1/2 animate-pulse" />

            <div className="relative z-10 min-h-screen flex items-center justify-center">
                {children}
            </div>

        </div>
    )
}

export default AnimatedBackground