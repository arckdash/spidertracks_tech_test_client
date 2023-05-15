import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme';
import Layout from './layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes as appRoutes, Route as RouteType } from './router/routes';

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer
                autoClose={500}
                limit={3}
                position="top-right"
                newestOnTop
                closeOnClick
                pauseOnFocusLoss={false}
                theme="light"
            />

            <Router>
                <Layout>
                    <Routes>
                        {
                            appRoutes.map((route: RouteType) => (
                                <Route
                                    key={route.key}
                                    path={route.path}
                                    element={
                                        <route.component />
                                    }
                                />
                            ))
                        }
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    )
}

export default App
