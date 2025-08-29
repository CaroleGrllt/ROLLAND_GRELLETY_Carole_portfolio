import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx';
import Project from './pages/Project.jsx';

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
						{
							path: '/project',
							element: < Project />,
						},
						{
							path: '*',
							element: < Home />,
						},
				]
		}
	]);

	return <RouterProvider router={router} />;
}

