import Image from "next/image";
import Link from "next/link";

let backPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND}/posters/${path}`;

export default function Card({
  movie,
}: {
  movie: { title: string; year: number; path: string; _id: string };
}) {
  return (
    <Link
      className="min-h-[400px] min-w-[150px] max-w-[300px]"
      href={`movies/${movie._id}`}
    >
      <div className="h-full w-full bg-card flex flex-col rounded-lg gap-2 p-2 hover:bg-input shadow-lg">
        <Image
          className="flex-1 w-full object-cover mb-1 block rounded-lg "
          src={backPath(movie.path)}
          width={300}
          height={217}
          alt="movie poster"
        />
        <h4 className="text-lg">{movie.title}</h4>
        <p className="text-sm text-white text-opacity-80">{movie.year}</p>
      </div>
    </Link>
  );
}
