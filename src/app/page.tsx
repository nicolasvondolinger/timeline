import Image from 'next/image'
import { timelineItems } from '../data'
import StarryBackground from '@/components/StarryBackground'
import TimeCounter from '@/components/TimeCounter'

export default function Home() {
  return (
    <main className="min-h-screen text-white relative">
      {/* Fundo Estrelado */}
      <StarryBackground />

      <div className="p-8 relative z-10">
        
        {/* Contador no Topo */}
        <div className="mb-20 mt-10">
          <TimeCounter />
        </div>
        
        <div className="flex flex-col items-center max-w-2xl mx-auto pb-20 relative">
          
          {/* A Linha Vertical Tracejada (Fica atrás de tudo) */}
          <div className="absolute top-4 bottom-0 left-1/2 -translate-x-1/2 w-px border-l-2 border-dashed border-gray-700/50 h-full" />

          {timelineItems.map((item) => (
            <div key={item.id} className="w-full flex flex-col items-center mb-16 relative z-10">
              
              {/* O Ano (Bolinha e Texto) */}
              <div className="mb-6 flex flex-col items-center bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-gray-800">
                <span className="text-yellow-500 font-bold text-2xl tracking-widest">
                  {item.year}
                </span>
              </div>

              {/* O Card da Imagem */}
              <div className="group relative w-full bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
                
                <div className="relative w-full aspect-[4/3]"> 
                  <Image 
                    src={item.imagePath} 
                    alt={item.phrase} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay Escuro Gradiente para a frase aparecer bem */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

                  {/* A Frase (Posicionada sobre a imagem, parte inferior) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xl text-center text-gray-100 font-light italic leading-relaxed drop-shadow-lg">
                      "{item.phrase}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {timelineItems.length === 0 && (
            <p className="text-gray-500">Adicione itens no arquivo src/app/data.ts</p>
          )}
        </div>
      </div>
    </main>
  )
}