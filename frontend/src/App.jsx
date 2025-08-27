import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx';
// import Login from './pages/Login.jsx'
// import Profile from './pages/Profile.jsx'


export default function App() {
  const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
						{
							index: true,
							element: < Home />,
						},
						// {
						// 	path: '/login',
						// 	element: < Login />,
						// },
						{
							path: '*',
							element: < Home />,
						},
				]
		}
	]);

	return <RouterProvider router={router} />;
}

