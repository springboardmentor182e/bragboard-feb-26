export default function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
      Error: {message}
    </div>
  );
}