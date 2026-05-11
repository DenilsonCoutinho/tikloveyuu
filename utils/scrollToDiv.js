"use client"
export async function scrollToDiv(element) {
    const divToView = document.getElementById(element)
    if (divToView !== null) {
        divToView?.scrollIntoView({ behavior: "smooth", inline: "start" })
    }
    else {
        while (window.location.pathname !== '/') {
            await new Promise(resolve => setTimeout(() => {
                resolve()
            }, 500))

        }
        await new Promise(resolve => setTimeout(() => {
            resolve()
        }, 100))
        const ditToRedirect = document.getElementById(element)
        ditToRedirect?.scrollIntoView({ behavior: 'smooth', block: "start" })
    }
}