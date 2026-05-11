"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import Affiliate from "../../../actions/affiliate";
export default function CreateAffiliate() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [percetage, setPercetage] = useState<number>(0)
    const [pixKey, setPixKey] = useState<string>("")

    async function createUserAffiliate() {
        await Affiliate(email,name,  percetage, pixKey)
    }
    return (
        <div>
            <h1 className="text-white">Nome</h1>
            <Input onChange={(e) => setName(e.target.value)} value={name} className="border border-white my-2" type="text" />
            <h1 className="text-white">Email</h1>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-white my-2" type="text" />
            <h1 className="text-white">Porcetagem</h1>
            <Input onChange={(e) => setPercetage(parseInt(e.target.value))} value={percetage} className="border border-white my-2" type="number" />
            <h1 className="text-white">Chave Pix:</h1>
            <Input onChange={(e) => setPixKey(e.target.value)} value={pixKey} className="border border-white my-2" type="text" />
            <Button onClick={() => createUserAffiliate()} type="button" className="bg-blue-600 w-full" variant={"solid"}>Criar</Button>
        </div>
    )
}