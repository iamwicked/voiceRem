import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Icon({ name, route }: { name: string; route: string }) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center gap-2 p-4 rounded-full cursor-pointer transition-colors duration-300 hover:bg-gradient-to-br from-purple-500 to-pink-500"
      onClick={() => router.push(route)}
    >
      <div className="relative w-12 h-12 bg-white rounded-full">
        <Image
          src="/icons.svg" 
          alt={name}
          fill
          style={{ objectFit: "contain" }} 
        />
      </div>
      <p className="text-sm font-medium text-gray-700">{name}</p>
    </div>
  );
}
