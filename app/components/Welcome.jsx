import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded shadow">
        <h1 className="text-center text-3xl font-bold text-[#211f1f]">Hola, Javier!</h1>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <Link href='/crear-compania'>
            <div className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus:shadow-outline">
              Crear Compañía
            </div>
          </Link>
          <Link href='/crear-espectaculo'>
            <div className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus:shadow-outline">
              Crear Espectáculo
            </div>
          </Link>
          <Link href='/crear-audicion'>
            <div className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus:shadow-outline">
              Crear Audición
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}