import { lazy, Suspense } from "react";
import { endpoints } from "../services/movieServices";

// Lazy load components
const Hero = lazy(() => import("../components/Hero"));
const MoviesRow = lazy(() => import("../components/MoviesRow"));

// Page-level loading component
const PageLoader = () => (
  <div className="space-y-8">
    {/* Hero skeleton */}
    <div className="h-96 animate-pulse rounded-lg bg-gray-300"></div>

    {/* Movie rows skeletons */}
    {[...Array(5)].map((_, i) => (
      <div key={i} className="space-y-4">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-300"></div>
        <div className="h-48 animate-pulse rounded-lg bg-gray-300"></div>
      </div>
    ))}
  </div>
);

const Home = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <div>
        <Hero />
        <MoviesRow title="popular" url={endpoints.popular} />
        <MoviesRow title="trending" url={endpoints.trending} />
        <MoviesRow title="upcoming" url={endpoints.upcoming} />
        <MoviesRow title="top rated" url={endpoints.topRated} />
        <MoviesRow title="comedy" url={endpoints.comedy} />
      </div>
    </Suspense>
  );
};

export default Home;
