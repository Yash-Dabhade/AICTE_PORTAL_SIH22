import React from 'react';

const InternalError = () => {
    return (
        <div class="container ml-10 mt-40 py-20 px-20 bg-slate-100">
        <a href="#" class="bg-slate-100">
            <p class="text-2xl font-bold">500, Internal Server Error</p>
            <p class="text-xl">Something went wrong.</p>
            <p class="text-xl">Try to refresh this page or feel free to contact us if the problem persists.</p>
        </a>
    </div>
    );
    
 };

 export default InternalError;