import { useState } from "react";

export default function ResumeButtons() {
    const [downloaded, setDownloaded] = useState(null);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/path-to-your-resume.pdf';
        link.download = 'YourName_Resume.pdf';
        link.click();
        setTimeout(() => setDownloaded(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center gap-16 p-8">
            <h1 className="text-white text-3xl font-light tracking-wider"> Download My Resume!</h1>
            <div className="flex flex-col items-center gap-4">
                <p className="text-gray-400 text-sm tracking-wide">Cyberpunk</p>
                <button
                    onClick={() => handleDownload(7)}
                    className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-mono tracking-wider text-sm uppercase transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 hover:shadow-[0_0_30px_rgba(34,211,238,0.5),inset_0_0_30px_rgba(34,211,238,0.1)]"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 group-hover:border-gray-900 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 group-hover:border-gray-900 transition-colors duration-300" />
                    <span className="flex items-center gap-2">
                        <span className="group-hover:animate-pulse">&gt;</span>
                        {downloaded === 7 ? "ACCESSING..." : "RESUME.PDF"}
                    </span>
                </button>
            </div>
            <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
        </div>
    );
}