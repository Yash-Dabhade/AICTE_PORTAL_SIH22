import React from 'react'

export default function DetailCard({onClose,visible}) {

    function handelSubmit(e){
        e.preventDefault();
        console.log("HandleSubmit");
        let report = document.getElementById("recordInput").value;
        alert(report)
    }
    if(!visible) return null
  return (
    <div >
        <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-white-300">
                        <button onClick={onClose} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    <div class="p-6 text-center">
                            <div>
                                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Enter Record here</label>
                                <input type="text" id="recordInput" class="block p-2 w-full text-gray-200 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black my-3 dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handelSubmit}>
                            Button
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
