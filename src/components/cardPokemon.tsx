import Image from "next/image";

type props = {
  name: string;
  type: string[];
  image: string;
};

export default function CardPokemon({ name, type, image }: Readonly<props>) {
  return (
    <div className="flex md:flex mt-2 mx-4 border-2 rounded justify-center">
      <div className="md:flex-shrink-0">
        <Image
          className="rounded-lg"
          src={image}
          alt="jeje"
          width={100}
          height={100}
        />
      </div>
      <div className="mt-4 md:mt-0 md:ml-6">
        <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
          {name}
        </div>
        <p className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
          {type.map((e, index) => (
            <span key={index} className="mr-2">
              {e}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
