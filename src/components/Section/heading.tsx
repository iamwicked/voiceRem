
export default function Heading({heading, subheading}:{heading:string, subheading: string}){
    return(
      <div className="text-center w-[100%] mb-[20px]">
      <h1 className="mb-[15px]">{heading}</h1>
      <h3>{subheading}</h3>
      </div>
    );
}