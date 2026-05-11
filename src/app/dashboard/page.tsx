"use client"
import { useEffect, useState, useTransition } from "react"
import { getAffiliateWithSurprise } from "../../../actions/surpriseSend"
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import ButtonUiUniverse from "../components/buttonUiUniverse"
import { SurpriseSend } from "@prisma/client"


type DashboardData = {
  name?: string
  surpriseSend?: SurpriseSend[]
}

export default function Dashboard() {
  const [dataDashboard, setDataDashboard] = useState<DashboardData>({})
  const [enter, setEnter] = useState(false)
  const [password, setPassword] = useState("")
  const [percentage, setPercentage] = useState(35)
  const [copied, setCopied] = useState(false)
  const affiliateLink = `https://www.tikloveyuu.com/?ref=7BAB6A01`
  const [isPending, startTransition] = useTransition()

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Segurança: se não tiver surpriseSend, usa array vazio para evitar erro
  const surpriseSends = dataDashboard.surpriseSend ?? []

  const taxaAsaas = 99; // taxa fixa do Asaas em centavos

// Filter vendas pagas
const getPaid = surpriseSends.filter(user => user?.paid === "PAID");
const getPending = surpriseSends.filter(user => user?.paid === "PENDING");

// descontar taxa de cada venda paga
const valoresLiquidos = getPaid.map(user => user.price! - taxaAsaas);

// somar valores líquidos (em centavos)
const somaLiquidaCentavos = valoresLiquidos.reduce((total, valor) => total + valor, 0);

// converter para reais
const somaLiquidaReais = somaLiquidaCentavos / 100;

const calculatePercentage = () => {
  if (somaLiquidaCentavos <= 0) return "0,00";

  const comissao = (somaLiquidaReais * percentage) / 100;

  return comissao.toFixed(2).replace(".", ",");
};

  async function enterMyDashboard() {
    startTransition(async () => {
      const { data, error } = await getAffiliateWithSurprise("7BAB6A01")
      if (!data) {
        alert(error)
        return
      }

      setDataDashboard(data)
      setEnter(true)
    })
  }
useEffect(()=>{
enterMyDashboard()
},[])
//   if (!enter) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-defaultBg">
//         <div className="flex flex-col items-center gap-2 max-w-[1200px] m-auto">
//           <h1 className="text-2xl text-white text-center font-extrabold">ENTRA NO MEU DASHBOARD</h1>
//           <Input
//             type="text"
//             onChange={e => setPassword(e.target.value)}
//             value={password}
//             className="border text-white border-wtext-white"
//           />
//           <ButtonUiUniverse disabled={isPending} onClick={enterMyDashboard} text={isPending ? "Aguarde..." : "Entrar"} />
//         </div>
//       </div>
//     )
//   }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full flex flex-col">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="space-x-4">
            <div className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              {dataDashboard.name}
            </div>
          </div>
        </header>

        <div className="flex space-x-2 my-4 px-6">
          <input
            type="text"
            value={affiliateLink}
            readOnly
            className="flex-grow px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 text-white font-medium rounded-md transition ${
              copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        <main className="flex flex-wrap items-start flex-1 p-6 w-full space-y-6">
          <div className="grid md:grid-cols-3 gap-6 w-full">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-bold text-gray-800">Meu Saldo</h2>
              <p className="text-2xl font-semibold text-blue-500">R$ {calculatePercentage()}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-bold text-gray-800">Vendas</h2>
              <p className="text-2xl font-semibold text-green-500">{getPaid.length}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-bold text-gray-800">Vendas Pendentes</h2>
              <p className="text-2xl font-semibold text-yellow-500">{getPending.length}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
