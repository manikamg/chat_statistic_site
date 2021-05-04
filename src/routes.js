import React from 'react';

const PageCoverLogin = React.lazy(() => import('./pages/Pages/AuthPages/PageCoverLogin'));
const MyLearning = React.lazy(() => import('./pages/Pages/Account/MyReport'));

const routes = [
    //routes without Layout
    
    { path: '/my-report', component: MyLearning },

    { path: '/login', component: PageCoverLogin, isWithoutLayout : true },
    //Index Main
    { exact : true, path: '/', component: PageCoverLogin, isWithoutLayout : true },
];

export default routes;