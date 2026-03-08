import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthMiddleware } from './components/AuthMiddleware';
import { RootRoute } from './pages/Route';

const router = createBrowserRouter([RootRoute], {});

function App() {
  return (
  <AuthProvider>
    <AuthMiddleware>
        <RouterProvider router={router} />
    </AuthMiddleware>
  </AuthProvider>
  );
}

export default App;
