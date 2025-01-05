"use client"
import { useEffect, useState } from "react"
import { getAffiliateWithUsers } from "../../../actions/affiliate"

export default function Dashboard() {
    const [dataDashboard, setDataDashboard] = useState<any>([])
    const [percentage, setPercentage] = useState<number>(35);
    useEffect(() => {
        async function getData() {
            const dataAffiliate = await getAffiliateWithUsers("E3A02944")
            setDataDashboard(dataAffiliate)
            console.log(dataAffiliate)
        }

        getData()
    }, [])
    if (!dataDashboard?.users) return
    const getPaid = dataDashboard?.users?.filter((user: any) => user.paid === "PAID")
    const getPending = dataDashboard?.users?.filter((user: any) => user.paid === "PENDING").length

    const getPrices = getPaid?.map((user: any) => user.price - 0.99)
    console.log(getPrices)

    const reducePrice = getPrices?.reduce((total: number, numero: number) => total + numero, 0);

    const calculatePercentage = () => {
        const calculatedResult = (reducePrice * percentage) / 100;
        console.log(calculatedResult)
        return calculatedResult.toFixed(2).toString().replace(".", ",")
    };
    return (
        <div className="flex h-screen bg-gray-100">
            {/* <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-lg font-bold border-b border-gray-700">
          My Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700">
            <span className="material-icons">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700">
            <span className="material-icons">person</span>
            <span>Profile</span>
          </a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside> */}

            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                    <div className="space-x-4">
                        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Add Item
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            Settings
                        </button> */}
                    </div>
                </header>

                <main className="flex-1 p-6 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold text-gray-800">Meu Saldo</h2>
                            <p className="text-2xl font-semibold text-blue-500">R$ {calculatePercentage()}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold text-gray-800">Vendas</h2>
                            <p className="text-2xl font-semibold text-green-500">{getPaid?.length || 0}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold text-gray-800">Vendas Pendente</h2>
                            <p className="text-2xl font-semibold text-yellow-500">{getPending || 0}</p>
                        </div>
                    </div>

                    {/* <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                        <p>Here you can place a chart or a table of data.</p>
                    </div> */}
                </main>
            </div>
        </div>

    )
}
