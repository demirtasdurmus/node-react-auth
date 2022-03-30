import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';


export default function PublicRoute(props) {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
};