import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import BrowsePage from '@/components/pages/BrowsePage';
import ContentDetailPage from '@/components/pages/ContentDetailPage';
import SubscriptionsPage from '@/components/pages/SubscriptionsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "browse",
        element: <BrowsePage />,
        routeMetadata: {
          pageIdentifier: 'browse',
        },
      },
      {
        path: "content/:id",
        element: <ContentDetailPage />,
        routeMetadata: {
          pageIdentifier: 'content-detail',
        },
      },
      {
        path: "subscriptions",
        element: <SubscriptionsPage />,
        routeMetadata: {
          pageIdentifier: 'subscriptions',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
