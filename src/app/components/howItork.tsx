import fields from '../../assets/howWork/fields.svg'
import emailCouple from '../../assets/howWork/email-phone 1.svg'
import couple from '../../assets/eu i kai.svg'
import payment from '../../assets/howWork/payment.svg'
import heart from '../../assets/heart.webp'
import Image from 'next/image'
export default function HowItWorks() {
    return (
        <>
            <div className='md:my-32 my-10 flex lg:flex-row flex-col max-w-[1100px] justify-between m-auto items-center lg:items-start'>
                {/* <div className='flex px-2 lg:flex-col flex-row justify-between w-full md:items-start items-center'> */}
                    <div className="flex relative md:flex-row flex-col justify-center lg:items-start items-center lg:justify-between  lg:flex-col  gap-7 ">
                        <h1 className='text-white  md:text-5xl text-3xl mb-12 z-50  font-bold'>Como  <span className='text-redDefault'>funciona</span></h1>
                        <Image src={heart} alt="heart" className="w-24 lg:relative absolute lg:opacity-100 opacity-10 lg:w-32 object-contain" />
                        <div style={{ transform: "scaleX(-1)", rotate: "-85deg" }} className="lg:block hidden mt-[100px]"><svg xmlns="http://www.w3.org/2000/svg" width="246" height="287" fill="none"><g clipPath="url(#a)"><path fill="#fff" d="M156.25 265.656c1.69-.212 2.323 0 2.957-.212 38.64-23.27 64.822-56.272 74.746-100.697 2.534-11.212 2.112-22.848-.844-34.271-6.124-24.54-26.605-41.464-51.732-42.945-13.091-.846-25.76.635-37.162 7.828-.845 6.134-1.478 12.269-2.745 17.981-2.111 9.308-6.968 16.924-15.625 21.578-6.335 3.597-12.669 3.597-16.047.212-4.435-4.443-4.434-10.366-1.69-15.232 3.801-6.769 8.446-13.116 13.303-19.039 3.167-3.808 7.39-6.981 11.191-10.154-3.59-23.906-26.183-34.06-53.21-24.117-.844 3.385-1.69 6.981-2.745 10.366-4.223 12.481-12.035 22-24.704 26.443-4.857 1.693-10.136 2.327-14.358-2.115-3.168-3.385-3.168-9.308.21-15.232 5.49-9.308 13.725-15.866 22.594-21.578 3.167-1.904 6.334-3.808 9.501-5.5C65.667 21.951 32.517-4.281 0 10.527c.211-2.75 0-5.077.845-6.346C1.9 2.7 4.223 1.854 6.123 1.43 24.071-1.954 40.752.16 54.477 13.277c10.346 9.732 17.314 21.578 21.96 35.118.633 1.903 1.266 3.807 2.11 5.711 0 .212.423.423 1.267 1.058 1.9-.211 4.223-.211 6.546-.635 28.294-4.442 43.074 3.174 56.166 29.617 2.534-.846 5.49-1.692 8.235-2.75 16.258-5.5 32.517-5.923 48.986-.423 26.816 8.885 44.13 31.944 46.031 61.138 1.055 15.866-1.689 31.098-7.39 45.906-13.936 35.752-36.74 63.888-70.947 82.293-1.689 1.058-3.589 1.904-5.278 2.962-.212.211-.423.634-1.056 1.904 7.179 1.692 13.936 1.057 20.693.634 6.545-.211 13.302-.846 20.481-1.269-.633 5.5-3.59 7.616-7.179 8.885-4.223 1.269-8.446 2.962-12.669 3.173-11.402.424-23.015.635-34.629 0-9.079-.634-11.613-5.5-7.601-12.904 8.657-15.655 17.525-31.309 26.394-46.964 1.478-2.539 3.378-4.654 5.701-7.616 4.012 4.654 2.322 8.039.844 11.212-5.912 11.424-11.191 22.848-16.892 35.329ZM43.919 94.936c14.57-1.905 23.649-11.213 24.282-24.329-9.713 6.347-19.003 12.059-24.282 24.329Zm71.369 32.79c12.457-2.962 18.37-11.424 17.103-24.329-8.024 6.77-14.992 13.117-17.103 24.329Z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h246v287H0z"></path></clipPath></defs></svg></div>
                    </div>
                {/* </div> */}
                <div className='grid md:grid-cols-2 max-w-[700px] md:place-items-end place-items-center m-auto gap-10 md:w-full'>
                    <div className='h-80 border-gray-800 border md:max-w-72 w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                        <h1 className='text-white p-5  text-center  font-bold'>1 - Preencha os dados</h1>
                        <Image className='m-auto translate-y-10' quality={100} height={250} width={250} alt='fields' src={fields} />
                    </div>
                    <div className='h-80 border-gray-800 border md:max-w-72 w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                        <h1 className='text-white p-5  text-center  font-bold'>2 - Faça o pagamento</h1>
                        <Image className='m-auto  p-5 translate-y-10' quality={100} height={250} width={250} alt='payment' src={payment} />
                    </div>
                    <div className='h-96 border-gray-800 border md:max-w-72 w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                        <h1 className='text-white p-5  text-center  font-bold'>3 - Receba seu QR Code no <br />e-mail</h1>
                        <Image className='m-auto  p-5 translate-y-14' quality={100} height={250} width={250} alt='email' src={emailCouple} />
                    </div>
                    <div className='h-96 border-gray-800 border md:max-w-72 w-full flex flex-col items-end bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                        <h1 className='text-white p-5  text-center  font-bold'>4 - Surpreenda seu amor</h1>
                        <Image className='m-auto  p-5 translate-y-' quality={100} height={250} width={250} alt='couple' src={couple} />
                    </div>
                </div>
            </div>
        </>
    )
}