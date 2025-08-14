export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-600 mb-3 sm:mb-4 text-center">
        Welcome to MyWebsite!
      </h1>
      <p className="text-base sm:text-lg text-gray-700 max-w-md sm:max-w-xl text-center leading-relaxed px-2">
        This is the home page. Feel free to explore About and Contact pages.
        Please sign up or login to access more features.
      </p>
    </div>
  );
}

