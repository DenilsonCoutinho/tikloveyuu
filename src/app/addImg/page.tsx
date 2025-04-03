"use client"
import { Button } from '@/components/ui/button';
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-button';
import { handleUpload } from '@/services/uploadImages';
import { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import Particles from '../../../components/Particles/Particles';

export default function addImg() {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewURLs, setPreviewURLs] = useState<[]>([])
    const [imageCouple, setImageCouple] = useState<any>([])

    const handleFileChange = async (event: any) => {
        if (event.acceptedFiles) {
            const files: any = event.acceptedFiles.map((file: any) => URL.createObjectURL(file)); // Converte FileList para array de File
            const filesToUpload: any = event.acceptedFiles // Converte FileList para array de File

            setPreviewURLs(files);
            setImageCouple(filesToUpload)
        }
    };
    async function Enviar() {
        // const uploadImages = await handleUpload(imageCouple, "84ea7985-45bc-49a2-b0fb-74ef952a0915")
    }

    return (
        <div className='h-screen  overflow-hidden'>
            {/* <FileUploadRoot ref={fileInputRef} accept={["image/png", "image/gif", "image/jpeg"]} onFileChange={handleFileChange} maxFiles={3}>
                <FileUploadTrigger asChild>
                    <Button variant="outline" className='text-white border-redDefault border w-full py-4' size="sm">
                    </Button>
                </FileUploadTrigger>
            </FileUploadRoot> */}
            <div className='h-96 w-96 bg-white z-10 relative'></div>
            <Particles
                className='absolute  w-full h-full top-0 bg-defaultBg'
                particleColors={['#fff', '#4500E5']}
                particleCount={500}
                particleSpread={20}
                speed={0.08}
                particleBaseSize={50}
                moveParticlesOnHover={false}
                alphaParticles={false}
                disableRotation={false}
            />
        </div>
    )
}