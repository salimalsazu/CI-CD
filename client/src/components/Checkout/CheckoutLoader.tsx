const CheckoutLoader = () => {
  return (
    <main className="max-w-7xl xl:mx-auto mx-5">
      <section className="md:grid grid-cols-12 min-h-screen">
        <div className="col-span-7 pt-10 md:mr-10">
          <div>
            <p className="h-5 w-24 bg-gray-200 animate-pulse rounded"></p>
            <p className="h-10 mt-5 bg-gray-200 animate-pulse rounded"></p>
          </div>
          <div className="mt-10">
            <p className="h-5 w-24 bg-gray-200 animate-pulse rounded"></p>
            <div className="flex gap-5 w-full">
              <p className="h-10 w-full mt-5 bg-gray-200 animate-pulse rounded"></p>
              <p className="h-10 mt-5 w-full bg-gray-200 animate-pulse rounded"></p>
            </div>
          </div>
          <div className="mt-10">
            <p className="h-5 w-24 bg-gray-200 animate-pulse rounded"></p>
            <div className="flex gap-5 w-full">
              <p className="h-10 w-full mt-5 bg-gray-200 animate-pulse rounded"></p>
              <p className="h-10 mt-5 w-full bg-gray-200 animate-pulse rounded"></p>
            </div>
            <div className="gap-5 mt-10 grid grid-cols-3">
              <div>
                <p className="h-5 w-24 bg-gray-200 animate-pulse rounded"></p>
                <p className="h-10 mt-5 bg-gray-200 animate-pulse rounded"></p>
              </div>
              <div>
                <p className="h-5 w-24 bg-gray-200 animate-pulse rounded"></p>
                <p className="h-10 mt-5 bg-gray-200 animate-pulse rounded"></p>
              </div>
              <div>
                <p className="h-5 w-24 bg-gray-200 animate-pulse rounded"></p>
                <p className="h-10 mt-5 bg-gray-200 animate-pulse rounded"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 md:border-l pt-10 md:pl-10">
          <div>
            <p className="h-16 bg-gray-200 animate-pulse rounded"></p>
            <p className="h-16 mt-5 bg-gray-200 animate-pulse rounded"></p>
            <p className="h-16 mt-5 bg-gray-200 animate-pulse rounded"></p>
          </div>
          <div className="mt-10">
            <ul className="flex justify-between">
              <li className="h-4 w-20 bg-gray-200 animate-pulse rounded"></li>
              <li className="h-4 w-20 bg-gray-200 animate-pulse rounded"></li>
            </ul>
          </div>
          <div className="mt-5">
            <ul className="flex justify-between">
              <li className="h-4 w-20 bg-gray-200 animate-pulse rounded"></li>
              <li className="h-4 w-20 bg-gray-200 animate-pulse rounded"></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutLoader;
