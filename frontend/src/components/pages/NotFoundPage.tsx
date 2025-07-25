import useTitle from "../../hooks/useTitle";
import Button from "../Button";

const NotFoundPage = () => {
  useTitle("404");

  return (
    <>
      <h1 className="text-4xl lg:text-7xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <Button variant="primary" href="/" className="py-2">
        Go back to home
      </Button>
    </>
  );
};

export default NotFoundPage;
