import React, { useEffect,useState } from 'react';
import Index from "./Index";
import Detail from "./Detail";
import Edit from "./Edit";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

const Base = () => {

    return (
        <>
            <BrowserRouter>
                <header className="bg-primary">
                    <h1>
                        <Link className="text-white text-decoration-none" to={"/"}>簡易掲示板</Link>
                    </h1>
                </header>

                <main className="container">
                        <Routes>
                            <Route path={`/`}           element={<Index />} />
                            <Route path={`/topic/:id`}  element={<Detail />} />
                            <Route path={`/topic/edit/:id`}  element={<Edit />} />
                        </Routes>
                </main>
            </BrowserRouter>

        </>
    )
};

export default Base;


