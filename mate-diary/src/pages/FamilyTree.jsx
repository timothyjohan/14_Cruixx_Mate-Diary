import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'

export default function FamilyTree(){
    return(
        <>
            <p class="text-2xl">
                Animal Family Tree
            </p>
            <div>
                <p class="inline text-lg">Animal child : </p>
                <select class="text-black w-1/4 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 inline">
                    <option>
                        test
                    </option>
                </select>
            </div>
            
            <div class="grid grid-cols-2">
                <div>
                    <div class="grid grid-cols-4 gap-2 my-5">
                        <button
                            type="button"
                            class="bg-red-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                            Warning
                        </button>
                        <button
                            type="button"
                            class="bg-red-800 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                            Warning
                        </button>
                        <button
                            type="button"
                            class="bg-red-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                            Warning
                        </button>
                        <button
                            type="button"
                            class="bg-red-800 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                            Warning
                        </button>
                    </div>
                    <div class="grid grid-cols-4 gap-2 my-5">
                        <div class="flex justify-end mr-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </div>
                        <div class="flex ml-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                            </svg>
                        </div>
                        <div class="flex justify-end mr-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </div>
                        <div class="flex ml-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                            </svg>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 my-5">
                        <button
                            type="button"
                            class="bg-yellow-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                            Warning
                        </button>
                        <button
                            type="button"
                            class="bg-yellow-600 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                            Warning
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2 my-5">
                        <div class="flex justify-end mr-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </div>
                        <div class="flex ml-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                            </svg>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-2 my-5">
                        <button
                            type="button"
                            class="bg-green-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                            CHILD
                        </button>
                    </div>
                </div>
                <div class="ml-10 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6">
                        <h1 class="text-sm font-bold leading-tight tracking-tight md:text-lg">
                            Selected animal details :
                        </h1>
                        <h1 class="text-sm leading-tight tracking-tight md:text-md">
                            Nama Panggilan : 
                        </h1>
                        <h1 class="text-sm leading-tight tracking-tight md:text-md">
                            Nama Hewan : 
                        </h1>
                        <h1 class="text-sm leading-tight tracking-tight md:text-md">
                            Kode Hewan (kalau ada) : 
                        </h1>
                        <h1 class="text-sm leading-tight tracking-tight md:text-md">
                            Asal Hewan : 
                        </h1>
                        <h1 class="text-sm leading-tight tracking-tight md:text-md">
                            Nama Ayah Hewan : 
                        </h1>
                        <h1 class="text-sm leading-tight tracking-tight md:text-md">
                            Nama Ibu Hewan : 
                        </h1>
                        <div class="flex justify-end">
                            <button
                                type="button"
                                class="text-right bg-sky-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            >
                                SET TO CHILD
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}