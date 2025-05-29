"use client"
import * as motion from "motion/react-client"
import JSConfetti from 'js-confetti'
import type { Variants } from "motion/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCreateCard } from "@/lib/zustad/useCreateCard"
import { useEffect, useState } from "react"
export default function ImageCouples({ images }: { images?: string[] }) {

    const { setStep, step, setSpotifyMusic, spotifyMusic,hasHydrated } = useCreateCard()
    // const [inputUrl, setInputUrl] = useState(spotifyMusic)

    const [spotifyId, setSpotifyId] = useState<string | null>("")
    const [type, setType] = useState<"track" | "playlist" | "album" | "">("")
    const handleExtract = () => {
        const regex = /spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/;
        const match = spotifyMusic?.match(regex)
        console.log(spotifyMusic)
        console.log(match)
        if (match && match[1] && match[2]) {
            setType(match[1] as "track" | "playlist" | "album")
            setSpotifyId(match[2])
        }
    }

    const getSpotifyEmbedUrl = () => {
        // if (!spotifyId || !type) return ""
        return `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator`
    }
    useEffect(() => {
       if(!hasHydrated) {
          setSpotifyMusic(spotifyMusic)
        }
    }, [hasHydrated])
    useEffect(() => {

        const jsConfetti = new JSConfetti()
        new Promise((resolve) => setTimeout(resolve, 2000))
        jsConfetti.addConfetti({
            emojis: ['💙', '💙', '💙', '💙', '💫', '💙'],
            confettiNumber: 20
        })
        handleExtract()
        new Promise((resolve) => setTimeout(resolve, 6000)).then(() => {

            jsConfetti.clearCanvas()
        })
    }, [])

    return (
        <div style={container}>
            {images?.map((images, i) => (
                <Card i={10} image={images} hueA={240} hueB={10} key={i} />
            ))}
            {<Button onClick={() => setStep(0)} className="border bg-transparent px-4 h-7 z-10 fixed top-2 left-4 text-white">Resetar</Button>}
            {/* {<Button onClick={() => handleExtract()} className="border bg-transparent px-4 h-7 z-10 fixed top-12 left-4">Resetar</Button>} */}

            {spotifyMusic&&<iframe
                className="rounded-2xl"
                style={{ marginTop: 120, zIndex: 10, position: "relative" }}
                src={getSpotifyEmbedUrl()}
                width="100%"
                height="80"
                frameBorder="0px"
                allow=""
                loading="lazy"
            ></iframe>}
        </div>
    )
}

interface CardProps {
    image: string
    hueA: number
    hueB: number
    i: number
}

function Card({ image, hueA, hueB, i }: CardProps) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    return (
        <>
            <motion.div
                className={`card-container-${i} select-none`}
                style={cardContainer}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.8 }}>
                <div style={{ ...splash, background }} />
                <motion.div style={card} variants={cardVariants} className="card">
                    <Image src={image} alt="image" width={100} height={100} quality={100} className="object-cover w-full h-full" />
                </motion.div>
            </motion.div>
        </>
    )
}

const cardVariants: Variants = {
    offscreen: {
        y: 400,
    },
    onscreen: {
        y: 50,
        rotate: -7,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    margin: "10px auto",
    maxWidth: 400,
    paddingBottom: 100,
    width: "100%",
}

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -84,
}

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
    fontSize: 164,
    width: 300,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 50%",
}

/**
 * ==============   Data   ================
 */

// const food: [string, number, number][] = [
//     ["🍅", 240, 10],
//     ["🍊", 196, 10],
//     ["🍋", 410, 10],
//     ["🍐", 80, 120],
// ]
