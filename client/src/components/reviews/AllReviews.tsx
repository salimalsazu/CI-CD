import { Rate } from "rsuite";

const AllReviews = () => {
  return (
    <>
      <div className="max-w-lg lg:mx-auto mx-4">
        <h1 className="text-4xl text-center font-semibold">Read trusted reviews from our customers</h1>
        <p className="my-5 text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit soluta tenetur natus aut tempora, optio repellendus quae accusamus excepturi? Distinctio.</p>
      </div>
      <section className="md:max-w-7xl mx-5 xl:mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <SingleReview />
        <SingleReview />
        <SingleReview />
      </section>
    </>
  );
};

const SingleReview = () => {
  return (
    <div className="border rounded-md p-5 shadow">
      <Rate size="xs" defaultValue={5} readOnly />
      <h1 className="text-2xl font-bold mt-2">Shafin Chowdhury</h1>
      <p className="my-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
        assumenda repellendus pariatur. Ratione beatae tempora pariatur
        inventore, quod unde accusantium
      </p>
      <h6 className="font-medium">Managing Director</h6>
    </div>
  );
};

export default AllReviews;
