import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthMiddleware } from './components/AuthMiddleware';
import { RootRoute } from './pages/Route';
import { ProfileProvider } from './context/ProfileContext';
import { NebulaProvider } from './context/NebulaContext';

const router = createBrowserRouter([RootRoute], {});

function App() {
  return (
  <AuthProvider>
    <AuthMiddleware>
      <NebulaProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </NebulaProvider>
    </AuthMiddleware>
  </AuthProvider>
  );
}

export default App;
